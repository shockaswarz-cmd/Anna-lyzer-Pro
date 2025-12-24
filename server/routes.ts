import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertQuoteRequestSchema } from "../shared/schema";
import { sendEmail, formatQuoteEmail, formatUserConfirmationEmail } from "./email";
import { fetchLodgifyProperties } from "./lodgify";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote request endpoints
  app.post("/api/quote", async (req, res) => {
    try {
      console.log('Quote request received from:', req.body.email ? '[REDACTED]' : 'anonymous');
      
      // Validate property type is provided
      if (!req.body.propertyType) {
        return res.status(400).json({ success: false, error: 'Property type is required' });
      }
      
      // Extract postcode from address
      const postcode = extractPostcode(req.body.propertyAddress || '');
      const requestData = { ...req.body, postcode: postcode || 'Not provided' };
      
      // Validate basic request data
      const validatedData = insertQuoteRequestSchema.parse(requestData);
      
      // Persist quote to storage first (ensures data is saved even if email fails)
      const quoteId = await storage.insertQuoteRequest(validatedData);
      console.log('Quote saved to storage with ID:', quoteId);
      
      // Send admin email notification with user's full quote data
      try {
        const emailData = {
          ...validatedData,
          quoteId,
          bedrooms: validatedData.propertyType,
        };
        const { subject, html, text } = formatQuoteEmail(emailData);
        
        await sendEmail({
          to: 'info@bourarroproperties.co.uk',
          from: 'info@bourarroproperties.co.uk',
          replyTo: 'info@bourarroproperties.co.uk',
          subject,
          html,
          text,
        });
        
        console.log('Full quote notification email sent to info@bourarroproperties.co.uk');
      } catch (emailError) {
        // Don't fail the quote request if email fails
        console.error('Failed to send admin email notification:', emailError);
      }
      
      // Send user confirmation email with admin BCC'd
      try {
        const confirmationData = {
          name: validatedData.name,
          email: validatedData.email,
        };
        const { subject: userSubject, html: userHtml, text: userText } = formatUserConfirmationEmail(confirmationData);
        
        await sendEmail({
          to: validatedData.email,
          from: 'info@bourarroproperties.co.uk',
          replyTo: 'info@bourarroproperties.co.uk',
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
        message: 'Quote request submitted successfully'
      });
    } catch (error) {
      console.error('Quote request error:', error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Invalid request data' 
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
    
    const pages = [
      { path: '/', freq: 'weekly', priority: '1.0' },
      { path: '/services', freq: 'weekly', priority: '0.9' },
      { path: '/properties', freq: 'daily', priority: '0.9' },
      { path: '/about', freq: 'monthly', priority: '0.8' },
      { path: '/investors', freq: 'weekly', priority: '0.9' },
      { path: '/faq', freq: 'monthly', priority: '0.7' },
      { path: '/contact', freq: 'monthly', priority: '0.8' },
      { path: '/privacy-policy', freq: 'monthly', priority: '0.5' },
      { path: '/terms-conditions', freq: 'monthly', priority: '0.5' },
      { path: '/cookie-policy', freq: 'monthly', priority: '0.5' },
    ];
    
    const urls = pages.map(p => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n');
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Extract postcode from address string (kept for form processing)
function extractPostcode(address: string): string {
  const postcodeRegex = /([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[1].toUpperCase().replace(/\s+/g, ' ') : '';
}
