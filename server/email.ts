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
  const subject = `New Property Investment Quote Request - ${quoteData.postcode || 'Unknown Area'}`;
  
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
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Guaranteed Rent (Monthly):</td>
              <td style="padding: 8px 0; color: #f4d03f; font-weight: bold; font-size: 18px;">£${quoteData.guaranteedRent.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Annual Rental Yield:</td>
              <td style="padding: 8px 0; color: #1a1a1a;">${quoteData.rentalYield}%</td>
            </tr>
          </table>
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
Guaranteed Rent (Monthly): £${quoteData.guaranteedRent.toLocaleString()}
Annual Rental Yield: ${quoteData.rentalYield}%
` : ''}

${quoteData.message ? `
ADDITIONAL MESSAGE:
${quoteData.message}
` : ''}

Quote submitted: ${new Date().toLocaleString('en-GB')}
Quote ID: ${quoteData.quoteId || 'Generated automatically'}
  `;

  return { subject, html, text };
}