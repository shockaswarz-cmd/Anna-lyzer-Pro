import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, PropertyDataSchema } from "../shared/schema";
import { sendEmail, formatQuoteEmail } from "./email";
import { fetchLodgifyProperties } from "./lodgify";

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
      
      // Send email notification to Marcus
      try {
        const emailData = {
          ...validatedData,
          quoteId,
          postcode,
        };
        const { subject, html, text } = formatQuoteEmail(emailData);
        
        await sendEmail({
          to: 'Info@Bourarroproperties.uk',
          from: 'noreply@bourarroproperties.uk', // This should be a verified sender in SendGrid
          subject,
          html,
          text,
        });
        
        console.log('Quote notification email sent to Info@Bourarroproperties.uk');
      } catch (emailError) {
        // Don't fail the quote request if email fails
        console.error('Failed to send email notification:', emailError);
      }
      
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

  // Lodgify properties endpoint
  app.get("/api/lodgify/properties", async (req, res) => {
    try {
      console.log('Fetching Lodgify properties...');
      const properties = await fetchLodgifyProperties();
      res.json(properties);
    } catch (error) {
      console.error('Error fetching Lodgify properties:', error);
      res.status(500).json({ 
        error: 'Failed to fetch properties',
        message: 'Unable to load property listings at this time'
      });
    }
  });

  // SEO Sitemap endpoint
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const currentDate = new Date().toISOString();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms-conditions</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/cookie-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
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

// Get property market data from free UK government sources
async function getPropertyMarketData(postcode: string): Promise<{
  postcode: string;
  averagePrice: number;
  averageRent: number;
  rentalYield: number;
  transactionCount: number;
  lastUpdated: string;
  demandIndicators: {
    salesVolume: string;
    priceGrowth: string;
    marketActivity: string;
  };
  dataLimitations?: {
    coverageArea: string;
    rentalDataSource: string;
    fallbackUsed: boolean;
  };
}> {
  try {
    // Get recent property sales from HM Land Registry (FREE)
    const salesData = await fetchLandRegistryData(postcode);
    
    // Calculate average price from recent sales with better filtering
    const recentSales = salesData.filter(sale => {
      const saleDate = new Date(sale.date);
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 2); // Last 2 years only
      return saleDate >= cutoffDate;
    });
    
    const averagePrice = recentSales.length > 0 
      ? Math.round(recentSales.reduce((sum, sale) => sum + sale.price, 0) / recentSales.length)
      : 286000; // Updated 2025 UK average
    
    // Get regional rental data from ONS-based calculation (FREE)
    const regionData = await getRegionalDataFromPostcode(postcode);
    const averageRent = await calculateRegionalRent(postcode, averagePrice, regionData);
    
    // Calculate rental yield
    const rentalYield = Number(((averageRent * 12) / averagePrice * 100).toFixed(2));
    
    // Calculate demand indicators from sales data
    const demandIndicators = calculateDemandIndicators(salesData, recentSales);
    
    return {
      postcode,
      averagePrice,
      averageRent,
      rentalYield,
      transactionCount: recentSales.length,
      lastUpdated: new Date().toISOString(),
      demandIndicators,
      dataLimitations: {
        coverageArea: 'England and Wales (Land Registry) + UK regional rent data (ONS)',
        rentalDataSource: 'ONS regional statistics mapped to postcode area',
        fallbackUsed: recentSales.length === 0
      }
    };
  } catch (error) {
    console.error('Error fetching property data:', error);
    // Return enhanced fallback data with demand indicators
    return {
      postcode,
      averagePrice: 286000, // 2025 UK average
      averageRent: 1301, // 2025 UK average
      rentalYield: 5.45,
      transactionCount: 0,
      lastUpdated: new Date().toISOString(),
      demandIndicators: {
        salesVolume: 'Insufficient data',
        priceGrowth: 'Insufficient data', 
        marketActivity: 'Limited'
      },
      dataLimitations: {
        coverageArea: 'Fallback UK averages used',
        rentalDataSource: 'National averages - not postcode-specific data',
        fallbackUsed: true
      }
    };
  }
}

// Get regional data from postcode using free Postcodes.io API
async function getRegionalDataFromPostcode(postcode: string): Promise<{
  region: string;
  adminDistrict: string;
  country: string;
} | null> {
  try {
    const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    if (data.status === 200 && data.result) {
      return {
        region: data.result.region || data.result.country || 'Unknown',
        adminDistrict: data.result.admin_district || 'Unknown',
        country: data.result.country || 'England'
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching postcode data:', error);
    return null;
  }
}

// Calculate regional rent based on ONS data and property value (FREE)
async function calculateRegionalRent(postcode: string, propertyValue: number, regionData: any): Promise<number> {
  // UK Regional Rent Multipliers based on Dec 2024 ONS data
  const regionalRentMultipliers: { [key: string]: number } = {
    // England regions
    'London': 1.45,                    // Higher rent relative to property values
    'South East': 1.25,
    'South West': 1.15,
    'East of England': 1.20,
    'West Midlands': 1.10,
    'East Midlands': 1.08,
    'Yorkshire and The Humber': 1.05,
    'North West': 1.10,
    'North East': 1.00,
    
    // Countries
    'Wales': 1.00,
    'Scotland': 1.05,
    'Northern Ireland': 0.95,
    
    // Default fallback
    'Unknown': 1.10
  };

  // Base rent calculation (approx 0.45% of property value per month as starting point)
  let baseMonthlyRent = propertyValue * 0.0045;
  
  // Apply regional multiplier
  const region = regionData?.region || 'Unknown';
  const multiplier = regionalRentMultipliers[region] || regionalRentMultipliers['Unknown'];
  
  // Calculate rent with regional adjustment
  const adjustedRent = Math.round(baseMonthlyRent * multiplier);
  
  // Apply bounds based on UK rental market 2024 data
  // Min: £400/month, Max: £4000/month for typical properties
  return Math.max(400, Math.min(4000, adjustedRent));
}

// Calculate property demand indicators from sales data (FREE)
function calculateDemandIndicators(allSales: Array<{ price: number; date: string; propertyType: string }>, recentSales: Array<{ price: number; date: string; propertyType: string }>): {
  salesVolume: string;
  priceGrowth: string;
  marketActivity: string;
} {
  // Sales Volume Analysis
  let salesVolume = 'Low';
  if (recentSales.length > 10) salesVolume = 'High';
  else if (recentSales.length > 5) salesVolume = 'Medium';
  
  // Price Growth Analysis (comparing recent vs older sales)
  let priceGrowth = 'Stable';
  if (allSales.length >= 4) {
    const sortedSales = allSales.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const oldSales = sortedSales.slice(0, Math.floor(sortedSales.length / 2));
    const newSales = sortedSales.slice(Math.floor(sortedSales.length / 2));
    
    if (oldSales.length > 0 && newSales.length > 0) {
      const oldAvg = oldSales.reduce((sum, sale) => sum + sale.price, 0) / oldSales.length;
      const newAvg = newSales.reduce((sum, sale) => sum + sale.price, 0) / newSales.length;
      const growth = ((newAvg - oldAvg) / oldAvg) * 100;
      
      if (growth > 10) priceGrowth = 'Rising';
      else if (growth < -5) priceGrowth = 'Declining';
      else priceGrowth = 'Stable';
    }
  }
  
  // Market Activity Analysis (based on transaction frequency)
  let marketActivity = 'Limited';
  if (allSales.length > 20) marketActivity = 'Active';
  else if (allSales.length > 10) marketActivity = 'Moderate';
  
  return {
    salesVolume,
    priceGrowth,
    marketActivity
  };
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
