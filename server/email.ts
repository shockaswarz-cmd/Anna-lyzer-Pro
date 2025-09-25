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
          ${quoteData.currentRent ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">Current Rent:</td>
            <td style="padding: 8px 0; color: #1a1a1a;">£${quoteData.currentRent}/month</td>
          </tr>
          ` : ''}
        </table>




        ${quoteData.message ? `
        <h3 style="color: #1a1a1a; border-bottom: 2px solid #f4d03f; padding-bottom: 10px;">Additional Message</h3>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; color: #1a1a1a; line-height: 1.5;">
          ${quoteData.message}
        </div>
        ` : ''}

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
Postcode: ${quoteData.postcode || 'Not provided'}
Property Type: ${quoteData.propertyType}
${quoteData.currentRent ? `Current Rent: £${quoteData.currentRent}/month` : ''}

${quoteData.message ? `
ADDITIONAL MESSAGE:
${quoteData.message}
` : ''}
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