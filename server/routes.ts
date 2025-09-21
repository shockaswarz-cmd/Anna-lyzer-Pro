import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, PropertyDataSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote request endpoints
  app.post("/api/quote", async (req, res) => {
    try {
      console.log('Quote request received from:', req.body.email ? '[REDACTED]' : 'anonymous');
      
      // Validate request body
      const validatedData = insertQuoteRequestSchema.parse(req.body);
      
      // Extract postcode for property data lookup
      const postcode = extractPostcode(validatedData.propertyAddress);
      validatedData.postcode = postcode;
      
      // Get property market data
      const propertyData = await getPropertyMarketData(postcode);
      
      // Calculate guaranteed rent (typically 80-90% of market rent)
      const guaranteedRentRate = 0.85;
      const guaranteedRent = Math.round(propertyData.averageRent * guaranteedRentRate);
      
      // Store the quote request with calculated data
      validatedData.estimatedValue = propertyData.averagePrice;
      validatedData.marketRent = propertyData.averageRent;
      validatedData.guaranteedRent = guaranteedRent;
      validatedData.rentalYield = propertyData.rentalYield.toString();
      
      const quoteId = await storage.insertQuoteRequest(validatedData);
      
      res.json({
        success: true,
        quoteId,
        data: {
          estimatedValue: propertyData.averagePrice,
          marketRent: propertyData.averageRent,
          guaranteedRent,
          rentalYield: propertyData.rentalYield,
          postcode,
        }
      });
    } catch (error) {
      console.error('Quote request error:', error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid request data' 
      });
    }
  });

  // Property data lookup endpoint
  app.get("/api/property-data/:postcode", async (req, res) => {
    try {
      const { postcode } = req.params;
      const propertyData = await getPropertyMarketData(postcode);
      res.json(PropertyDataSchema.parse(propertyData));
    } catch (error) {
      console.error('Property data lookup error:', error);
      res.status(400).json({ 
        success: false, 
        error: 'Failed to fetch property data for this postcode' 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Extract postcode from address string
function extractPostcode(address: string): string {
  const postcodeRegex = /([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[1].toUpperCase().replace(/\s+/g, ' ') : '';
}

// Get property market data from UK government sources
async function getPropertyMarketData(postcode: string): Promise<{
  postcode: string;
  averagePrice: number;
  averageRent: number;
  rentalYield: number;
  transactionCount: number;
  lastUpdated: string;
  dataLimitations?: {
    coverageArea: string;
    rentalDataSource: string;
    fallbackUsed: boolean;
  };
}> {
  try {
    // Get recent property sales from HM Land Registry
    const salesData = await fetchLandRegistryData(postcode);
    
    // Calculate average price from recent sales
    const averagePrice = salesData.length > 0 
      ? Math.round(salesData.reduce((sum, sale) => sum + sale.price, 0) / salesData.length)
      : 250000; // UK average fallback
    
    // LIMITATION: Rental estimate based on property value heuristic (0.5% per month)
    // This is NOT real rental data - would need VOA/ONS rental datasets for accuracy
    const averageRent = Math.round(averagePrice * 0.005); // Estimated from property value
    
    // Calculate rental yield
    const rentalYield = Number(((averageRent * 12) / averagePrice * 100).toFixed(2));
    
    return {
      postcode,
      averagePrice,
      averageRent,
      rentalYield,
      transactionCount: salesData.length,
      lastUpdated: new Date().toISOString(),
      dataLimitations: {
        coverageArea: 'England and Wales only (Land Registry)',
        rentalDataSource: 'Estimated from property values - not real rental data',
        fallbackUsed: salesData.length === 0
      }
    };
  } catch (error) {
    console.error('Error fetching property data:', error);
    // Return fallback data based on UK averages
    return {
      postcode,
      averagePrice: 286000, // 2025 UK average
      averageRent: 1301, // 2025 UK average
      rentalYield: 5.45,
      transactionCount: 0,
      lastUpdated: new Date().toISOString(),
      dataLimitations: {
        coverageArea: 'Fallback UK averages used',
        rentalDataSource: 'National averages - not postcode-specific data',
        fallbackUsed: true
      }
    };
  }
}

// Fetch property sales data from HM Land Registry
async function fetchLandRegistryData(postcode: string): Promise<Array<{ price: number; date: string; propertyType: string }>> {
  try {
    const response = await fetch(
      `https://landregistry.data.gov.uk/data/ppi/transaction-record.json?propertyAddress.postcode=${encodeURIComponent(postcode)}&_limit=50`
    );
    
    if (!response.ok) {
      throw new Error(`Land Registry API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract and process the sales data
    const sales = [];
    if (data.result && data.result.items) {
      for (const item of data.result.items) {
        if (item.pricePaid && item.transactionDate) {
          sales.push({
            price: parseInt(item.pricePaid),
            date: item.transactionDate,
            propertyType: item.propertyType?.prefLabel || 'Unknown'
          });
        }
      }
    }
    
    // Sort by date (most recent first) and limit to recent transactions
    return sales
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20); // Last 20 transactions
      
  } catch (error) {
    console.error('Land Registry API error:', error);
    return [];
  }
}
