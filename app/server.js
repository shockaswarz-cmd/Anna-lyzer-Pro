import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';
import UserAgent from 'user-agents';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

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
const parsePrice = (str) => {
    if (!str) return 0;
    // Remove "pcm", "per month", "pw", etc if present to avoid confusion, though regex below handles it.
    // Match the first sequence of digits and commas/dots preceded by a currency symbol or just a number
    // This regex looks for digits possibly separated by commas
    const match = str.match(/(?:£|€|\$)?\s?([\d,]+)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
};

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    try {
        console.log(`Scraping URL: ${url}`);
        const { data } = await axios.get(url, {
            headers: getHeaders(),
            timeout: 15000 // Increased timeout
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
        else if (url.includes('gumtree.com')) source = 'Gumtree';

        // Detect Transaction Type (Sale vs Rent)
        let transactionType = 'sale'; // Default
        const lowerUrl = url.toLowerCase();
        const lowerTitle = (title || '').toLowerCase();

        if (
            lowerUrl.includes('to-rent') ||
            lowerUrl.includes('to-let') ||
            lowerUrl.includes('to-rent') ||
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
        let features = [];

        // Site-Specific Extraction
        if (source === 'Rightmove') {
            const priceText = $('._1n9_62q9').text() || $('div:contains("£")').first().text();
            price = parsePrice(priceText);

            // Bedrooms/Bathrooms often in specific test-id elements or meta
            const bedText = $('div[data-testid="property-summary-features"] span:contains("bedroom")').text();
            const bathText = $('div[data-testid="property-summary-features"] span:contains("bathroom")').text();
            bedrooms = parseInt(bedText) || 0;
            bathrooms = parseInt(bathText) || 0;

            // Features
            $('ul._1u9_62q9 li').each((i, el) => features.push($(el).text().trim()));
            if (features.length === 0) {
                $('div[data-testid="property-description"] li').each((i, el) => features.push($(el).text().trim()));
            }
        } else if (source === 'Zoopla') {
            price = parsePrice($('div[data-testid="price"]').text());
            bedrooms = parseInt($('span[data-testid="beds-label"]').text()) || 0;
            bathrooms = parseInt($('span[data-testid="baths-label"]').text()) || 0;

            $('ul[data-testid="key-features-list"] li').each((i, el) => features.push($(el).text().trim()));
        } else if (source === 'OnTheMarket') {
            price = parsePrice($('.price-data').text());
            const bedMatch = title.match(/(\d+)\s*bed/i);
            if (bedMatch) bedrooms = parseInt(bedMatch[1]);
        }

        // Generic Fallback for fields
        if (price === 0) {
            const description = $('meta[property="og:description"]').attr('content') || '';
            const rentMatch = description.match(/£([\d,]+)\s?(pcm|per month)/i);
            const saleMatch = description.match(/£([\d,]+)/);
            price = transactionType === 'rent' ? (rentMatch ? parsePrice(rentMatch[0]) : 0) : (saleMatch ? parsePrice(saleMatch[0]) : 0);

            if (price === 0) {
                const bodyText = $('body').text();
                const fallbackMatch = bodyText.match(/£\s?([\d,]+)/);
                if (fallbackMatch) price = parsePrice(fallbackMatch[0]);
            }
        }

        if (bedrooms === 0) {
            const bedMatch = (title + ' ' + description).match(/(\d+)\s*(?:bed|bedroom)/i);
            if (bedMatch) bedrooms = parseInt(bedMatch[1]);
        }

        // Improved Address Parsing
        let address = title;
        if (title.includes(' in ')) address = title.split(' in ')[1];
        else if (title.includes(' at ')) address = title.split(' at ')[1];

        address = address.split(' - ')[0]
            .split(' | ')[0]
            .replace('Rightmove', '')
            .replace('Zoopla', '')
            .replace('OnTheMarket', '')
            .trim();

        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;
        const postcodeMatch = address.match(postcodeRegex) || $('body').text().match(postcodeRegex);
        const postcode = postcodeMatch ? postcodeMatch[0] : '';

        const type = (lowerTitle.includes('flat') || lowerTitle.includes('apartment')) ? 'flat' :
            (lowerTitle.includes('detached')) ? 'detached' :
                (lowerTitle.includes('terrace')) ? 'terraced' : 'house';

        return res.json({
            success: true,
            data: {
                source,
                transactionType,
                url,
                address: address.trim(),
                postcode: postcode,
                price: price,
                bedrooms,
                bathrooms,
                features: features.slice(0, 10),
                type,
                image: image || '',
                description: description || ''
            }
        });

    } catch (error) {
        console.error('Scraping failed:', error.message);
        // Differentiate errors if possible
        if (error.response && error.response.status === 403) {
            return res.status(403).json({ success: false, error: 'Access Denied by Target Website (Anti-Bot)' });
        }
        return res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/flood-risk', async (req, res) => {
    const { postcode } = req.query;
    if (!postcode) return res.json({ items: [] });

    try {
        // Current flood warnings
        const floodUrl = `https://environment.data.gov.uk/flood-monitoring/id/floods?postcode=${encodeURIComponent(postcode)}`;
        const { data } = await axios.get(floodUrl);
        res.json(data); // returns { items: [...] }
    } catch (error) {
        console.error('Flood API failed:', error.message);
        res.json({ items: [] });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
