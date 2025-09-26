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
  replyTo?: string;
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
      replyTo: params.replyTo || params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html || '',
      headers: {
        'X-Entity-ID': 'BourarroProperties',
        'X-Mailer': 'Bourarro Properties System v1.0',
        'List-Unsubscribe': '<mailto:unsubscribe@bourarroproperties.co.uk>',
        'Precedence': 'bulk',
      },
      categories: ['transactional', 'quote-confirmation'],
      customArgs: {
        email_type: 'quote_confirmation',
        business: 'bourarro_properties'
      }
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
  const subject = `Quote Request Confirmed - Bourarro Properties`;
  
  const html = `
    <div style="font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
      <!-- Header Section with Logo -->
      <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 30px; text-align: center; position: relative;">
        <div style="margin-bottom: 20px;">
          <img src="https://bourarroproperties.uk/logo.png" alt="Bourarro Properties Logo" style="height: 60px; width: auto; filter: brightness(1.2);" />
        </div>
        <h1 style="color: #FFD700; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); margin: 0 0 15px 0; font-size: 32px; letter-spacing: 1px;">Bourarro Properties</h1>
        <h2 style="color: #00FF7F; font-weight: 600; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); margin: 0; font-size: 22px; letter-spacing: 0.5px;">Quote Request Received</h2>
        <!-- Decorative line -->
        <div style="height: 3px; width: 100px; background: linear-gradient(90deg, #FFD700, #00FF7F); margin: 20px auto 0; border-radius: 2px;"></div>
      </div>
      
      <!-- Main Content Section -->
      <div style="padding: 40px 35px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h3 style="color: #1a1a1a; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Hi ${firstName},</h3>
          <div style="height: 2px; width: 60px; background: linear-gradient(90deg, #FFD700, #00FF7F); margin: 15px auto; border-radius: 1px;"></div>
        </div>
        
        <div style="text-align: center; margin-bottom: 35px;">
          <p style="color: #333333; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; font-weight: 400;">
            Thank you for requesting a property quote with <strong style="color: #1a1a1a;">Bourarro Properties</strong>.
          </p>
          
          <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0;">
            We've received your details and one of our experienced team members will review your request and get in touch shortly to discuss next steps.
          </p>
        </div>
        
        <!-- Properties CTA Section -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 12px; margin: 35px 0; border: 1px solid #dee2e6; text-align: center;">
          <h4 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Explore Our Premium Properties</h4>
          <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            While we prepare your custom quote, discover our current luxury serviced accommodation listings.
          </p>
          <a href="https://bourarro.lodgify.com/" 
             style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); 
                    color: #1a1a1a; 
                    padding: 14px 35px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: 600; 
                    display: inline-block;
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(255,215,0,0.3);
                    transition: all 0.3s ease;">
            View Our Properties
          </a>
        </div>
        
        <!-- Investment CTA Section -->
        <div style="background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%); padding: 30px; border-radius: 12px; margin: 35px 0; border: 1px solid #c3e6cb; text-align: center;">
          <h4 style="color: #1a1a1a; font-size: 20px; font-weight: 600; margin: 0 0 15px 0;">Join Our Investment Community</h4>
          <p style="color: #555555; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
            Connect with fellow property investors and get exclusive access to market insights and opportunities.
          </p>
          <a href="https://chat.whatsapp.com/DR10Vs1zkXO07s7C0VMymb?mode=ems_copy_t" 
             style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); 
                    color: white; 
                    padding: 14px 35px; 
                    text-decoration: none; 
                    border-radius: 8px; 
                    font-weight: 600; 
                    display: inline-block;
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(37,211,102,0.3);">
            Join WhatsApp Community
          </a>
        </div>
        
        <div style="text-align: center; margin: 35px 0;">
          <p style="color: #333333; font-size: 18px; line-height: 1.6; margin: 0; font-weight: 500;">
            We look forward to helping you achieve a <strong style="color: #1a1a1a;">hassle-free, guaranteed rental experience</strong>.
          </p>
        </div>
      </div>
      
      <!-- Professional Signature Section -->
      <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 35px 30px; border-top: 3px solid #FFD700;">
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="display: inline-block; padding: 0 20px;">
            <img src="https://bourarroproperties.uk/logo.png" alt="Bourarro Properties" style="height: 45px; width: auto; opacity: 0.9;" />
          </div>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
          <p style="color: #1a1a1a; font-size: 18px; line-height: 1.4; margin: 0 0 5px 0; font-weight: 600;">
            Best regards,
          </p>
          <p style="color: #333333; font-size: 20px; line-height: 1.4; margin: 0; font-weight: 700; letter-spacing: 0.5px;">
            The Bourarro Properties Team
          </p>
        </div>
        
        <div style="text-align: center; margin-bottom: 25px;">
          <div style="height: 2px; width: 80px; background: linear-gradient(90deg, #FFD700, #00FF7F); margin: 0 auto; border-radius: 1px;"></div>
        </div>
        
        <div style="text-align: center;">
          <table style="margin: 0 auto; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 15px; text-align: center;">
                <p style="color: #555555; font-size: 14px; margin: 0; font-weight: 500;">
                  📧 <a href="mailto:info@bourarroproperties.co.uk" style="color: #1a1a1a; text-decoration: none; font-weight: 600;">info@bourarroproperties.co.uk</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 15px; text-align: center;">
                <p style="color: #555555; font-size: 14px; margin: 0; font-weight: 500;">
                  🌐 <a href="https://bourarroproperties.uk" style="color: #FFD700; text-decoration: none; font-weight: 600;">www.bourarroproperties.uk</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 15px; text-align: center;">
                <p style="color: #555555; font-size: 14px; margin: 0; font-weight: 500;">
                  🏢 Premium Property Investment Solutions
                </p>
              </td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #6c757d; font-size: 12px; margin: 0 0 5px 0; font-style: italic;">
            "Your trusted partner in hassle-free, guaranteed rental experiences"
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 12px;">
        <p style="margin: 0 0 10px 0;"><strong>Bourarro Properties Ltd</strong></p>
        <p style="margin: 0 0 10px 0;">123 Business Park, London, UK, SW1A 1AA</p>
        <p style="margin: 0 0 10px 0;">This is a transactional email confirming your quote request.</p>
        <p style="margin: 0;">You received this email because you requested a quote on our website.</p>
      </div>
    </div>
  `;

  const text = `
Hi ${firstName},

Thank you for requesting a property quote with Bourarro Properties.

We've received your details and one of our team members will review your request and get in touch shortly to discuss next steps.

In the meantime, feel free to explore our current serviced accommodation listings here:
https://bourarro.lodgify.com/

🏢 INTERESTED IN PROPERTY INVESTMENT?
Join our exclusive Investors WhatsApp Group for market insights, investment opportunities, and networking with fellow property investors.
Join here: https://chat.whatsapp.com/DR10Vs1zkXO07s7C0VMymb?mode=ems_copy_t

We look forward to helping you achieve a hassle-free, guaranteed rental experience.

Best regards,
The Bourarro Properties Team
info@bourarroproperties.co.uk
www.bourarroproperties.uk

---
Bourarro Properties Ltd
123 Business Park, London, UK, SW1A 1AA

This is a transactional email confirming your quote request.
You received this email because you requested a quote on our website.
  `;

  return { subject, html, text };
}