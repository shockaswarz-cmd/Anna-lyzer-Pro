// Email service using SendGrid integration
import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY environment variable not set - email notifications disabled");
}

const mailService = new MailService();
if (process.env.SENDGRID_API_KEY) {
  mailService.setApiKey(process.env.SENDGRID_API_KEY);
}

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured - email not sent');
    return false;
  }

  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
    });
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

// Format quote request for email
export function formatQuoteEmail(quoteData: any): { subject: string; html: string; text: string } {
  const subject = `New Quote Request - ${quoteData.propertyAddress}`;
  
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 20px;">
        <h1 style="color: #f4d03f; margin: 0 0 10px 0; font-size: 24px;">Bourarro Properties</h1>
        <h2 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h2>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h3 style="color: #1a1a1a; margin-top: 0; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.phone}</td>
          </tr>
        </table>

        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Property Information</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Address:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.propertyAddress}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Postcode:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.postcode || 'Not extracted'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Property Type:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.propertyType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Bedrooms:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.bedrooms}</td>
          </tr>
        </table>

        ${quoteData.estimatedValue ? `
        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Market Analysis</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Estimated Property Value:</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-weight: bold;">£${quoteData.estimatedValue.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Market Rent (Monthly):</td>
              <td style="padding: 8px 0; color: #1a1a1a;">£${quoteData.marketRent.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Annual Rental Yield:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.rentalYield}%</td>
            </tr>
            ${quoteData.propertyData?.demandIndicators ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Market Activity:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.propertyData.demandIndicators.marketActivity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Price Growth:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.propertyData.demandIndicators.priceGrowth}</td>
            </tr>
            ` : ''}
          </table>
        </div>
        ` : ''}

        ${quoteData.servicedAccommodationAnalysis ? `
        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Serviced Accommodation Profitability</h3>
        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #28a745;">
          <div style="margin-bottom: 15px;">
            <strong style="color: #1a1a1a; font-size: 16px;">Suitability: ${quoteData.servicedAccommodationAnalysis.suitability}</strong>
            <p style="margin: 5px 0; color: #555; font-style: italic;">${quoteData.servicedAccommodationAnalysis.suitabilityReason}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Estimated Nightly Rate:</td>
              <td style="padding: 6px 0; color: #1a1a1a;">£${quoteData.servicedAccommodationAnalysis.nightlyRate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Weekly Rate:</td>
              <td style="padding: 6px 0; color: #1a1a1a;">£${quoteData.servicedAccommodationAnalysis.weeklyRate}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Estimated Occupancy:</td>
              <td style="padding: 6px 0; color: #1a1a1a;">${Math.round(quoteData.servicedAccommodationAnalysis.occupancyRate * 100)}%</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Gross Monthly Revenue:</td>
              <td style="padding: 6px 0; color: #1a1a1a; font-weight: bold;">£${quoteData.servicedAccommodationAnalysis.monthlyRevenue.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; color: #555;">Operating Costs:</td>
              <td style="padding: 6px 0; color: #dc3545;">-£${quoteData.servicedAccommodationAnalysis.operatingCosts.monthly.toLocaleString()}</td>
            </tr>
            <tr style="border-top: 2px solid #28a745;">
              <td style="padding: 10px 0; font-weight: bold; color: #28a745; font-size: 16px;">Net Monthly Revenue:</td>
              <td style="padding: 10px 0; color: #28a745; font-weight: bold; font-size: 16px;">£${quoteData.servicedAccommodationAnalysis.netRevenue.monthly.toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="font-size: 12px; color: #666;">
            <strong>Cost Breakdown:</strong> Cleaning (£${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.cleaning}), 
            Utilities (£${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.utilities}), 
            Management (£${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.management}), 
            Insurance & Other (£${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.insurance + quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.maintenance + quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.supplies})
          </div>
        </div>
        ` : ''}

        ${quoteData.guaranteedRentRange ? `
        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Recommended Rent-to-Rent Offer</h3>
        <div style="background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); padding: 25px; border-radius: 8px; margin-bottom: 25px; border: 2px solid #f4d03f;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 28px; font-weight: bold; color: #1a1a1a; margin-bottom: 5px;">
              £${quoteData.guaranteedRentRange.minimum.toLocaleString()} - £${quoteData.guaranteedRentRange.maximum.toLocaleString()}
            </div>
            <div style="font-size: 14px; color: #856404;">per month guaranteed rent range</div>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Our Recommended Offer:</td>
                <td style="padding: 8px 0; color: #f4d03f; font-weight: bold; font-size: 20px;">£${quoteData.guaranteedRentRange.recommended.toLocaleString()}/month</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Minimum Offer:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">£${quoteData.guaranteedRentRange.minimum.toLocaleString()}/month</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Maximum Offer:</td>
                <td style="padding: 8px 0; color: #1a1a1a;">£${quoteData.guaranteedRentRange.maximum.toLocaleString()}/month</td>
              </tr>
            </table>
          </div>
          
          <div style="font-size: 13px; color: #856404; line-height: 1.4;">
            <strong>Analysis:</strong> ${quoteData.guaranteedRentRange.reasoning}
          </div>
        </div>
        ` : ''}

        ${quoteData.message ? `
        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Additional Message</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; color: #1a1a1a; line-height: 1.5;">
          ${quoteData.message}
        </div>
        ` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px;">
          <p>Quote submitted: ${new Date().toLocaleString('en-GB')}</p>
          <p>Quote ID: ${quoteData.quoteId || 'Generated automatically'}</p>
          <p><a href="https://bourarroproperties.uk/admin/quotes/${quoteData.quoteId}" style="color: #f4d03f; text-decoration: none;">View in Admin Dashboard →</a></p>
        </div>
      </div>
    </div>
  `;

  const text = `
BOURARRO PROPERTIES - New Quote Request

CLIENT DETAILS:
Name: ${quoteData.name}
Email: ${quoteData.email}
Phone: ${quoteData.phone}

PROPERTY INFORMATION:
Address: ${quoteData.propertyAddress}
Postcode: ${quoteData.postcode || 'Not extracted'}
Property Type: ${quoteData.propertyType}
Bedrooms: ${quoteData.bedrooms}

${quoteData.estimatedValue ? `
MARKET ANALYSIS:
Estimated Property Value: £${quoteData.estimatedValue.toLocaleString()}
Market Rent (Monthly): £${quoteData.marketRent.toLocaleString()}
Annual Rental Yield: ${quoteData.rentalYield}%
${quoteData.propertyData?.demandIndicators ? `Market Activity: ${quoteData.propertyData.demandIndicators.marketActivity}
Price Growth: ${quoteData.propertyData.demandIndicators.priceGrowth}` : ''}
` : ''}

${quoteData.servicedAccommodationAnalysis ? `
SERVICED ACCOMMODATION PROFITABILITY:
Suitability: ${quoteData.servicedAccommodationAnalysis.suitability}
Analysis: ${quoteData.servicedAccommodationAnalysis.suitabilityReason}

Estimated Nightly Rate: £${quoteData.servicedAccommodationAnalysis.nightlyRate}
Weekly Rate: £${quoteData.servicedAccommodationAnalysis.weeklyRate}
Estimated Occupancy: ${Math.round(quoteData.servicedAccommodationAnalysis.occupancyRate * 100)}%
Gross Monthly Revenue: £${quoteData.servicedAccommodationAnalysis.monthlyRevenue.toLocaleString()}
Operating Costs: £${quoteData.servicedAccommodationAnalysis.operatingCosts.monthly.toLocaleString()}
NET MONTHLY REVENUE: £${quoteData.servicedAccommodationAnalysis.netRevenue.monthly.toLocaleString()}

Cost Breakdown:
- Cleaning: £${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.cleaning}
- Utilities: £${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.utilities}
- Management: £${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.management}
- Insurance & Other: £${quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.insurance + quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.maintenance + quoteData.servicedAccommodationAnalysis.operatingCosts.breakdown.supplies}
` : ''}

${quoteData.guaranteedRentRange ? `
RECOMMENDED RENT-TO-RENT OFFER:
Range: £${quoteData.guaranteedRentRange.minimum.toLocaleString()} - £${quoteData.guaranteedRentRange.maximum.toLocaleString()} per month
Our Recommended Offer: £${quoteData.guaranteedRentRange.recommended.toLocaleString()}/month

Analysis: ${quoteData.guaranteedRentRange.reasoning}
` : ''}

${quoteData.message ? `
ADDITIONAL MESSAGE:
${quoteData.message}
` : ''}

Quote submitted: ${new Date().toLocaleString('en-GB')}
Quote ID: ${quoteData.quoteId || 'Generated automatically'}
Admin Dashboard: https://bourarroproperties.uk/admin/quotes/${quoteData.quoteId}
  `;

  return { subject, html, text };
}

// Format user confirmation email
export function formatUserConfirmationEmail(userData: any): { subject: string; html: string; text: string } {
  const firstName = userData.name ? userData.name.split(' ')[0] : 'there';
  const subject = `Thank You for Requesting Your Quote!`;
  
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 20px; text-align: center;">
        <h1 style="color: #f4d03f; margin: 0 0 10px 0; font-size: 28px;">Bourarro Properties</h1>
        <h2 style="color: white; margin: 0; font-size: 18px;">Quote Request Received</h2>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h3 style="color: #1a1a1a; margin-top: 0; font-size: 24px;">Hi ${firstName},</h3>
        
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          Thank you for requesting a property quote with <strong>Bourarro Properties</strong>.
        </p>
        
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          We've received your details and one of our team members will review your request and get in touch shortly to discuss next steps.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f4d03f;">
          <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0;">
            In the meantime, feel free to explore our current serviced accommodation listings:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://bourarro.lodgify.com/" 
               style="background: linear-gradient(135deg, #f4d03f 0%, #e6c34a 100%); 
                      color: #1a1a1a; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 6px; 
                      font-weight: bold; 
                      display: inline-block;
                      font-size: 16px;">
              View Our Properties
            </a>
          </div>
        </div>
        
        <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 20px 0;">
          We look forward to helping you achieve a <strong>hassle-free, guaranteed rental experience</strong>.
        </p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
          <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
            Best regards,<br>
            <strong>The Bourarro Properties Team</strong>
          </p>
          <p style="color: #6c757d; font-size: 14px; margin: 10px 0 0 0;">
            Email: info@bourarroproperties.co.uk<br>
            Website: <a href="https://bourarroproperties.uk" style="color: #f4d03f; text-decoration: none;">www.bourarroproperties.uk</a>
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 12px;">
        <p style="margin: 0;">This is an automated confirmation email. Feel free to reply directly to this email if you have any questions.</p>
      </div>
    </div>
  `;

  const text = `
Hi ${firstName},

Thank you for requesting a property quote with Bourarro Properties.

We've received your details and one of our team members will review your request and get in touch shortly to discuss next steps.

In the meantime, feel free to explore our current serviced accommodation listings here:
https://bourarro.lodgify.com/

We look forward to helping you achieve a hassle-free, guaranteed rental experience.

Best regards,
The Bourarro Properties Team
info@bourarroproperties.co.uk
www.bourarroproperties.uk

---
This is an automated confirmation email. Feel free to reply directly to this email if you have any questions.
  `;

  return { subject, html, text };
}