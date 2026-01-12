export const scrapeDeal = async (url) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/scrape`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const result = await response.json();

        if (result.success && result.data) {
            const { transactionType, price } = result.data;

            // Smart Mapping based on Transaction Type
            let dealPrice = price; // Purchase Price
            let estimatedRent = 0;

            if (transactionType === 'rent') {
                // If it's a rental listing, the "price" scraped is likely the rent
                estimatedRent = price;
                dealPrice = 0; // Purchase price unknown (R2R deal?)
            }

            return {
                id: Date.now().toString(),
                url: result.data.url,
                source: result.data.source, // 'Rightmove', 'Zoopla', etc.
                transactionType: result.data.transactionType, // 'sale' or 'rent'
                address: result.data.address || '',
                postcode: result.data.postcode || '',
                price: dealPrice,
                type: result.data.type || 'terraced',
                bedrooms: result.data.bedrooms || 0,
                bathrooms: result.data.bathrooms || 0,
                tenure: 'freehold',
                description: result.data.description || '',
                features: result.data.features || [],
                images: result.data.image ? [result.data.image] : [],
                agent: {},

                // If rent was scraped, populate it
                rentMonthly: estimatedRent,
                refurb: 0,
                metrics: {}
            };
        }

        throw new Error(result.error || 'Failed to scrape deal - please input manually');
    } catch (error) {
        console.error('Scraper Error:', error);
        throw error;
    }
};
