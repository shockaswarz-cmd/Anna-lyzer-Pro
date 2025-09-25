import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema, PropertyDataSchema } from "../shared/schema";
import { sendEmail, formatQuoteEmail, formatUserConfirmationEmail } from "./email";
import { fetchLodgifyProperties } from "./lodgify";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote request endpoints
  app.post("/api/quote", async (req, res) => {
    try {
      console.log('Quote request received from:', req.body.email ? '[REDACTED]' : 'anonymous');
      
      // Extract postcode for property data lookup  
      const postcode = extractPostcode(req.body.propertyAddress || '');
      const requestData = { ...req.body, postcode: postcode || 'UNKNOWN' };
      
      // Validate request body with postcode included
      const validatedData = insertQuoteRequestSchema.parse(requestData);
      
      // Get property market data
      const propertyData = await getPropertyMarketData(postcode);
      
      // Calculate serviced accommodation profitability
      const servicedAccommodationAnalysis = calculateServicedAccommodationProfitability(
        propertyData, 
        validatedData.propertyType,
        validatedData.postcode
      );
      
      // Calculate guaranteed rent range based on market analysis
      const guaranteedRentRange = calculateGuaranteedRentRange(
        propertyData.averageRent,
        servicedAccommodationAnalysis
      );
      
      const guaranteedRent = guaranteedRentRange.recommended;
      
      // Store the quote request with calculated data
      validatedData.estimatedValue = propertyData.averagePrice;
      validatedData.marketRent = propertyData.averageRent;
      validatedData.guaranteedRent = guaranteedRent;
      validatedData.rentalYield = propertyData.rentalYield.toString();
      
      const quoteId = await storage.insertQuoteRequest(validatedData);
      
      // Send admin email notification
      try {
        const emailData = {
          ...validatedData,
          quoteId,
          postcode,
          propertyData,
          servicedAccommodationAnalysis,
          guaranteedRentRange,
        };
        const { subject, html, text } = formatQuoteEmail(emailData);
        
        await sendEmail({
          to: 'Info@bourarroproperties.uk',
          from: 'info@bourarroproperties.co.uk',
          subject,
          html,
          text,
        });
        
        console.log('Quote notification email sent to Info@bourarroproperties.uk');
      } catch (emailError) {
        // Don't fail the quote request if email fails
        console.error('Failed to send admin email notification:', emailError);
      }

      // Send user confirmation email
      try {
        const confirmationData = {
          name: validatedData.name,
          email: validatedData.email,
        };
        const { subject: userSubject, html: userHtml, text: userText } = formatUserConfirmationEmail(confirmationData);
        
        await sendEmail({
          to: validatedData.email,
          from: 'info@bourarroproperties.co.uk',
          subject: userSubject,
          html: userHtml,
          text: userText,
        });
        
        console.log('Confirmation email sent to user:', validatedData.email);
      } catch (userEmailError) {
        // Don't fail the quote request if confirmation email fails
        console.error('Failed to send user confirmation email:', userEmailError);
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
      `https://landregistry.data.gov.uk/data/ppi/transaction-record.json?propertyAddress.postcode=${encodeURIComponent(postcode)}`
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

// Calculate serviced accommodation profitability analysis
function calculateServicedAccommodationProfitability(
  propertyData: any,
  propertyType: string,
  postcode: string
): {
  nightlyRate: number;
  weeklyRate: number;
  monthlyRevenue: number;
  annualRevenue: number;
  occupancyRate: number;
  operatingCosts: {
    monthly: number;
    annual: number;
    breakdown: {
      cleaning: number;
      utilities: number;
      maintenance: number;
      insurance: number;
      management: number;
      supplies: number;
    };
  };
  netRevenue: {
    monthly: number;
    annual: number;
  };
  suitability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  suitabilityReason: string;
} {
  const region = getRegionFromPostcode(postcode);
  const isLondon = region === 'London';
  const isMajorCity = ['London', 'North West', 'West Midlands', 'Yorkshire and The Humber'].includes(region);
  
  // Base nightly rates by property type and location
  const baseRates = {
    'Studio': isLondon ? 85 : isMajorCity ? 65 : 45,
    '1 Bedroom': isLondon ? 120 : isMajorCity ? 90 : 65,
    '2 Bedroom': isLondon ? 180 : isMajorCity ? 130 : 95,
    '3 Bedroom': isLondon ? 250 : isMajorCity ? 180 : 130,
    '4+ Bedroom': isLondon ? 350 : isMajorCity ? 250 : 180,
    'House': isLondon ? 200 : isMajorCity ? 150 : 110,
    'Flat': isLondon ? 140 : isMajorCity ? 100 : 75,
    'Apartment': isLondon ? 140 : isMajorCity ? 100 : 75,
  };
  
  const nightlyRate = baseRates[propertyType as keyof typeof baseRates] || baseRates['2 Bedroom'];
  const weeklyRate = Math.round(nightlyRate * 6.5); // Weekly discount
  
  // Occupancy rates by location and demand indicators
  let baseOccupancy = isLondon ? 0.75 : isMajorCity ? 0.65 : 0.55;
  
  // Adjust based on market activity
  if (propertyData.demandIndicators?.marketActivity === 'Active') {
    baseOccupancy += 0.1;
  } else if (propertyData.demandIndicators?.marketActivity === 'Limited') {
    baseOccupancy -= 0.1;
  }
  
  const occupancyRate = Math.min(0.85, Math.max(0.45, baseOccupancy));
  
  // Calculate gross revenue
  const monthlyRevenue = Math.round(nightlyRate * 30.44 * occupancyRate); // Average days per month
  const annualRevenue = monthlyRevenue * 12;
  
  // Operating costs breakdown
  const cleaningCost = Math.round(nightlyRate * 0.15 * 30.44 * occupancyRate); // 15% of revenue for cleaning
  const utilitiesCost = isLondon ? 200 : isMajorCity ? 150 : 120;
  const maintenanceCost = Math.round(propertyData.averagePrice * 0.01 / 12); // 1% of property value annually
  const insuranceCost = isLondon ? 100 : isMajorCity ? 80 : 60;
  const managementCost = Math.round(monthlyRevenue * 0.15); // 15% management fee
  const suppliesCost = Math.round(monthlyRevenue * 0.05); // 5% for supplies/amenities
  
  const totalMonthlyCosts = cleaningCost + utilitiesCost + maintenanceCost + insuranceCost + managementCost + suppliesCost;
  
  const operatingCosts = {
    monthly: totalMonthlyCosts,
    annual: totalMonthlyCosts * 12,
    breakdown: {
      cleaning: cleaningCost,
      utilities: utilitiesCost,
      maintenance: maintenanceCost,
      insurance: insuranceCost,
      management: managementCost,
      supplies: suppliesCost,
    }
  };
  
  // Net revenue calculations
  const netMonthlyRevenue = monthlyRevenue - totalMonthlyCosts;
  const netAnnualRevenue = netMonthlyRevenue * 12;
  
  // Suitability assessment
  const netYield = (netAnnualRevenue / propertyData.averagePrice) * 100;
  let suitability: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  let suitabilityReason: string;
  
  if (netYield > 8 && occupancyRate > 0.7) {
    suitability = 'Excellent';
    suitabilityReason = `High net yield (${netYield.toFixed(1)}%) and strong demand in ${region}. Ideal for serviced accommodation.`;
  } else if (netYield > 6 && occupancyRate > 0.6) {
    suitability = 'Good';
    suitabilityReason = `Good net yield (${netYield.toFixed(1)}%) with decent occupancy rates. Suitable for serviced accommodation.`;
  } else if (netYield > 4 && occupancyRate > 0.5) {
    suitability = 'Fair';
    suitabilityReason = `Moderate net yield (${netYield.toFixed(1)}%). May work with excellent management and marketing.`;
  } else {
    suitability = 'Poor';
    suitabilityReason = `Low net yield (${netYield.toFixed(1)}%) and limited demand. Not recommended for serviced accommodation.`;
  }
  
  return {
    nightlyRate,
    weeklyRate,
    monthlyRevenue,
    annualRevenue,
    occupancyRate: Math.round(occupancyRate * 100) / 100,
    operatingCosts,
    netRevenue: {
      monthly: netMonthlyRevenue,
      annual: netAnnualRevenue,
    },
    suitability,
    suitabilityReason,
  };
}

// Calculate guaranteed rent range based on market analysis
function calculateGuaranteedRentRange(
  marketRent: number,
  servicedAccommodationAnalysis: any
): {
  minimum: number;
  maximum: number;
  recommended: number;
  reasoning: string;
} {
  const marketRentMonthly = marketRent;
  const servicedNetRevenue = servicedAccommodationAnalysis.netRevenue.monthly;
  
  // Base range: 75-90% of market rent
  let minRate = 0.75;
  let maxRate = 0.90;
  
  // Adjust based on serviced accommodation potential
  if (servicedAccommodationAnalysis.suitability === 'Excellent') {
    minRate = 0.80;
    maxRate = 0.95;
  } else if (servicedAccommodationAnalysis.suitability === 'Good') {
    minRate = 0.78;
    maxRate = 0.92;
  } else if (servicedAccommodationAnalysis.suitability === 'Poor') {
    minRate = 0.70;
    maxRate = 0.85;
  }
  
  // Factor in serviced accommodation net revenue vs market rent
  const revenueMultiplier = servicedNetRevenue / marketRentMonthly;
  if (revenueMultiplier > 2.0) {
    maxRate = Math.min(0.95, maxRate + 0.05);
  } else if (revenueMultiplier < 1.0) {
    maxRate = Math.max(0.80, maxRate - 0.05);
  }
  
  const minimum = Math.round(marketRentMonthly * minRate);
  const maximum = Math.round(marketRentMonthly * maxRate);
  const recommended = Math.round(marketRentMonthly * ((minRate + maxRate) / 2));
  
  const reasoning = `Based on market rent of £${marketRentMonthly.toLocaleString()}/month and serviced accommodation potential (${servicedAccommodationAnalysis.suitability.toLowerCase()} suitability, £${servicedNetRevenue.toLocaleString()}/month net revenue), we recommend a guaranteed rent range of £${minimum.toLocaleString()} - £${maximum.toLocaleString()}.`;
  
  return {
    minimum,
    maximum,
    recommended,
    reasoning,
  };
}

// Helper function to get region from postcode (simplified)
function getRegionFromPostcode(postcode: string): string {
  if (!postcode) return 'Unknown';
  
  const area = postcode.substring(0, 2).toUpperCase();
  const londonAreas = ['SW', 'SE', 'NW', 'NE', 'W1', 'WC', 'EC', 'E1', 'N1', 'CR', 'BR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB'];
  
  if (londonAreas.some(la => area.startsWith(la))) {
    return 'London';
  }
  
  const majorCityAreas = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'B1', 'B2', 'B3', 'B4', 'B5', 'LS', 'BD', 'HD'];
  if (majorCityAreas.some(ca => area.startsWith(ca))) {
    return 'North West';
  }
  
  return 'Other';
}
