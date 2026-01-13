import { NextRequest, NextResponse } from 'next/server';
import FirecrawlApp from '@mendable/firecrawl-js';
import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import UserAgent from 'user-agents';

// ============================================================================
// CONFIGURATION
// ============================================================================

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

const SCRAPER_CONFIG = {
    maxRetries: 3,
    baseDelayMs: 1000,
    timeout: 15000,
    rateLimitPerMinute: 5
};

// In-memory rate limiting (resets on server restart)
const rateLimitStore: Map<string, { count: number; resetAt: number }> = new Map();

// ============================================================================
// HELPER FUNCTIONS (FALLBACK)
// ============================================================================

// Get random user agent with realistic headers
const getHeaders = () => {
    const userAgent = new UserAgent({ deviceCategory: 'desktop' });
    return {
        'User-Agent': userAgent.toString(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.google.co.uk/'
    };
};

// Delay utility
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check rate limit for a domain
const checkRateLimit = (domain: string): { allowed: boolean; retryAfterMs?: number } => {
    const now = Date.now();
    const entry = rateLimitStore.get(domain);

    if (!entry || now > entry.resetAt) {
        rateLimitStore.set(domain, { count: 1, resetAt: now + 60000 });
        return { allowed: true };
    }

    if (entry.count >= SCRAPER_CONFIG.rateLimitPerMinute) {
        return { allowed: false, retryAfterMs: entry.resetAt - now };
    }

    entry.count++;
    return { allowed: true };
};

// Extract domain from URL
const getDomain = (url: string): string => {
    try {
        return new URL(url).hostname;
    } catch {
        return 'unknown';
    }
};

// Fallback Fetcher
const fetchWithRetry = async (url: string): Promise<string> => {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < SCRAPER_CONFIG.maxRetries; attempt++) {
        try {
            if (attempt > 0) {
                const backoffMs = SCRAPER_CONFIG.baseDelayMs * Math.pow(2, attempt);
                await delay(backoffMs);
            }

            const { data } = await axios.get(url, {
                headers: getHeaders(),
                timeout: SCRAPER_CONFIG.timeout,
                maxRedirects: 5,
                validateStatus: (status) => status < 500
            });

            return data;
        } catch (error) {
            lastError = error as Error;
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status >= 400 && axiosError.response.status !== 429) {
                throw error;
            }
        }
    }
    throw lastError || new Error('All fallback retry attempts exhausted');
};

// Parse price string to number
const parsePrice = (str: string): number => {
    if (!str) return 0;
    const match = str.match(/(?:£|€|\$)?\s?([\d,]+)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
};

// ============================================================================
// MAIN SCRAPE HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { url } = body;

    if (!url) {
        return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    // Rate Limit Check
    const domain = getDomain(url);
    const rateCheck = checkRateLimit(domain);
    if (!rateCheck.allowed) {
        return NextResponse.json({
            success: false,
            error: `Rate limit exceeded for ${domain}. Try again in ${Math.ceil((rateCheck.retryAfterMs || 0) / 1000)}s`
        }, { status: 429 });
    }

    let html = '';
    let fetchMethod = 'Firecrawl';

    // 1. Try Firecrawl Primary
    try {
        if (!FIRECRAWL_API_KEY) throw new Error('Firecrawl API Key missing');

        console.log(`[Scraper] Attempting Firecrawl: ${url}`);
        const app = new FirecrawlApp({ apiKey: FIRECRAWL_API_KEY });
        const scrapeResult = await app.scrapeUrl(url, { formats: ['html'] });

        if (!scrapeResult.success || !scrapeResult.html) {
            throw new Error(scrapeResult.error || 'No HTML returned');
        }

        html = scrapeResult.html;

    } catch (firecrawlError: any) {
        console.warn(`[Scraper] Firecrawl failed (${firecrawlError.message}). Switching to fallback.`);

        // 2. Try Legacy Fallback
        try {
            fetchMethod = 'Legacy Fallback';
            console.log(`[Scraper] Attempting Legacy Fetch: ${url}`);
            html = await fetchWithRetry(url);
        } catch (fallbackError: any) {
            console.error('[Scraper] All methods failed.');
            return NextResponse.json({
                success: false,
                error: `Scraping failed. Primary: ${firecrawlError.message}. Fallback: ${fallbackError.message}`
            }, { status: 500 });
        }
    }

    // 3. Common Parsing Logic (Cheerio)
    try {
        const $ = cheerio.load(html);

        // Basic Metadata
        let title = $('meta[property="og:title"]').attr('content') || $('title').text();
        let image = $('meta[property="og:image"]').attr('content');
        let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');

        // Detect Source
        let source = 'Unknown';
        if (url.includes('rightmove.co.uk')) source = 'Rightmove';
        else if (url.includes('zoopla.co.uk')) source = 'Zoopla';
        else if (url.includes('onthemarket.com')) source = 'OnTheMarket';

        // Detect Transaction Type
        let transactionType: 'sale' | 'rent' = 'sale';
        const lowerUrl = url.toLowerCase();
        const lowerTitle = (title || '').toLowerCase();

        if (
            lowerUrl.includes('to-rent') || lowerUrl.includes('to-let') || lowerUrl.includes('renting') ||
            lowerTitle.includes('to rent') || lowerTitle.includes('to let') || lowerTitle.includes('for rent')
        ) {
            transactionType = 'rent';
        }

        let price = 0;
        let bedrooms = 0;
        let bathrooms = 0;
        let features: string[] = [];

        // Parsing Logic
        if (source === 'Rightmove') {
            const priceText = $('article[data-testid="primary-layout"]').find('span').filter((_, el) => $(el).text().includes('£')).first().text() || $('div:contains("£")').first().text();
            price = parsePrice(priceText);
            bedrooms = parseInt($('div[class*="bedrooms"]').text()) || 0;
            bathrooms = parseInt($('div[class*="bathrooms"]').text()) || 0;
            if (bedrooms === 0) {
                const bedMatch = (title || '').match(/(\d+)\s*(?:bed|bedroom)/i);
                if (bedMatch) bedrooms = parseInt(bedMatch[1]);
            }
            $('ul[class*="KeyFeatures"] li').each((_, el) => { features.push($(el).text().trim()); });

        } else if (source === 'Zoopla') {
            price = parsePrice($('div[data-testid="price"]').text() || $('p[data-testid="price"]').text());
            bedrooms = parseInt($('span[data-testid="beds-label"]').text()) || 0;
            bathrooms = parseInt($('span[data-testid="baths-label"]').text()) || 0;
            $('ul[data-testid="key-features-list"] li').each((_, el) => { features.push($(el).text().trim()); });

        } else if (source === 'OnTheMarket') {
            price = parsePrice($('.price-data').text() || $('span[class*="price"]').text());
            const bedMatch = (title || '').match(/(\d+)\s*bed/i);
            if (bedMatch) bedrooms = parseInt(bedMatch[1]);
        }

        // Generic Fallback for price
        if (price === 0) {
            const descText = description || '';
            const rentMatch = descText.match(/£([\d,]+)\s?(pcm|per month)/i);
            const saleMatch = descText.match(/£([\d,]+)/);
            price = transactionType === 'rent'
                ? (rentMatch ? parsePrice(rentMatch[0]) : 0)
                : (saleMatch ? parsePrice(saleMatch[0]) : 0);

            if (price === 0) {
                const bodyText = $('body').text();
                const fallbackMatch = bodyText.match(/£\s?([\d,]+)/);
                if (fallbackMatch) price = parsePrice(fallbackMatch[0]);
            }
        }

        // Fallback bedrooms
        if (bedrooms === 0) {
            const bedMatch = ((title || '') + ' ' + (description || '')).match(/(\d+)\s*(?:bed|bedroom)/i);
            if (bedMatch) bedrooms = parseInt(bedMatch[1]);
        }

        // Address Parsing
        let address = title || '';
        if (address.includes(' in ')) address = address.split(' in ')[1];
        else if (address.includes(' at ')) address = address.split(' at ')[1];

        address = address.split(' - ')[0].split(' | ')[0]
            .replace('Rightmove', '').replace('Zoopla', '').replace('OnTheMarket', '').trim();

        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
        const postcodeMatch = address.match(postcodeRegex) || $('body').text().match(postcodeRegex);
        const postcode = postcodeMatch ? postcodeMatch[0] : '';

        const type = (lowerTitle.includes('flat') || lowerTitle.includes('apartment')) ? 'Flat' :
            (lowerTitle.includes('detached') && !lowerTitle.includes('semi')) ? 'Detached' :
                (lowerTitle.includes('semi-detached') || lowerTitle.includes('semi detached')) ? 'Semi-Detached' :
                    (lowerTitle.includes('terrace')) ? 'Terraced' :
                        (lowerTitle.includes('bungalow')) ? 'Bungalow' : 'Other';

        const images: string[] = [];
        if (image) images.push(image);
        $('img[src*="media.rightmove"], img[src*="lc.zoocdn"], img[src*="images.onthemarket"]').each((i, el) => {
            const src = $(el).attr('src');
            if (src && !images.includes(src) && images.length < 5) images.push(src);
        });

        console.log(`[Scraper] Success (${fetchMethod}): ${source} - ${postcode} - £${price}`);

        return NextResponse.json({
            success: true,
            data: {
                source,
                transactionType,
                url,
                address: address.trim(),
                postcode,
                price,
                bedrooms,
                bathrooms,
                features: features.slice(0, 10),
                propertyType: type,
                images: images.length > 0 ? images : [''],
                description: description || '',
                fetchMethod
            }
        });

    } catch (parseError: any) {
        console.error('[Scraper] Parsing Failed:', parseError.message);
        return NextResponse.json({ success: false, error: 'Parsing failed' }, { status: 500 });
    }
}
