import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import UserAgent from 'user-agents';

// Helper to get random user agent
const getHeaders = () => {
    const userAgent = new UserAgent();
    return {
        'User-Agent': userAgent.toString(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/'
    };
};

// Helper to parse price string to number
const parsePrice = (str: string): number => {
    if (!str) return 0;
    const match = str.match(/(?:£|€|\$)?\s?([\d,]+)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
};

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { url } = body;

    if (!url) {
        return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    try {
        console.log(`Scraping URL: ${url}`);
        const { data } = await axios.get(url, {
            headers: getHeaders(),
            timeout: 15000
        });
        const $ = cheerio.load(data);

        let title = $('meta[property="og:title"]').attr('content') || $('title').text();
        let image = $('meta[property="og:image"]').attr('content');
        let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');

        // Detect Source
        let source = 'Unknown';
        if (url.includes('rightmove.co.uk')) source = 'Rightmove';
        else if (url.includes('zoopla.co.uk')) source = 'Zoopla';
        else if (url.includes('onthemarket.com')) source = 'OnTheMarket';

        // Detect Transaction Type (Sale vs Rent)
        let transactionType: 'sale' | 'rent' = 'sale';
        const lowerUrl = url.toLowerCase();
        const lowerTitle = (title || '').toLowerCase();

        if (
            lowerUrl.includes('to-rent') ||
            lowerUrl.includes('to-let') ||
            lowerUrl.includes('renting') ||
            lowerTitle.includes('to rent') ||
            lowerTitle.includes('to let') ||
            lowerTitle.includes('for rent')
        ) {
            transactionType = 'rent';
        }

        let price = 0;
        let bedrooms = 0;
        let bathrooms = 0;
        let features: string[] = [];

        // Site-Specific Extraction
        if (source === 'Rightmove') {
            const priceText = $('article[data-testid="primary-layout"]').find('span').filter((_, el) => $(el).text().includes('£')).first().text() || $('div:contains("£")').first().text();
            price = parsePrice(priceText);

            // Try modern selectors
            bedrooms = parseInt($('div[class*="bedrooms"]').text()) || 0;
            bathrooms = parseInt($('div[class*="bathrooms"]').text()) || 0;

            // Fallback from title
            if (bedrooms === 0) {
                const bedMatch = (title || '').match(/(\d+)\s*(?:bed|bedroom)/i);
                if (bedMatch) bedrooms = parseInt(bedMatch[1]);
            }

            // Features from key features section
            $('ul[class*="KeyFeatures"] li').each((_, el) => features.push($(el).text().trim()));

        } else if (source === 'Zoopla') {
            price = parsePrice($('div[data-testid="price"]').text() || $('p[data-testid="price"]').text());
            bedrooms = parseInt($('span[data-testid="beds-label"]').text()) || 0;
            bathrooms = parseInt($('span[data-testid="baths-label"]').text()) || 0;
            $('ul[data-testid="key-features-list"] li').each((_, el) => features.push($(el).text().trim()));

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

        // Fallback bedrooms from title/description
        if (bedrooms === 0) {
            const bedMatch = ((title || '') + ' ' + (description || '')).match(/(\d+)\s*(?:bed|bedroom)/i);
            if (bedMatch) bedrooms = parseInt(bedMatch[1]);
        }

        // Address Parsing
        let address = title || '';
        if (address.includes(' in ')) address = address.split(' in ')[1];
        else if (address.includes(' at ')) address = address.split(' at ')[1];

        address = address.split(' - ')[0]
            .split(' | ')[0]
            .replace('Rightmove', '')
            .replace('Zoopla', '')
            .replace('OnTheMarket', '')
            .trim();

        // Postcode extraction
        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
        const postcodeMatch = address.match(postcodeRegex) || $('body').text().match(postcodeRegex);
        const postcode = postcodeMatch ? postcodeMatch[0] : '';

        // Property Type
        const type = (lowerTitle.includes('flat') || lowerTitle.includes('apartment')) ? 'Flat' :
            (lowerTitle.includes('detached') && !lowerTitle.includes('semi')) ? 'Detached' :
                (lowerTitle.includes('semi-detached') || lowerTitle.includes('semi detached')) ? 'Semi-Detached' :
                    (lowerTitle.includes('terrace')) ? 'Terraced' :
                        (lowerTitle.includes('bungalow')) ? 'Bungalow' : 'Other';

        // Get multiple images if available
        const images: string[] = [];
        if (image) images.push(image);
        $('img[src*="media.rightmove"], img[src*="lc.zoocdn"], img[src*="images.onthemarket"]').each((i, el) => {
            const src = $(el).attr('src');
            if (src && !images.includes(src) && images.length < 5) {
                images.push(src);
            }
        });

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
                description: description || ''
            }
        });

    } catch (error: any) {
        console.error('Scraping failed:', error.message);
        if (error.response && error.response.status === 403) {
            return NextResponse.json({ success: false, error: 'Access Denied by Target Website (Anti-Bot Protection)' }, { status: 403 });
        }
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
