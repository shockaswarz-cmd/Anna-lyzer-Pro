import { MailService } from '@sendgrid/mail';
import { getQuoteEmailHtml, getQuoteEmailText, getUserConfirmationHtml, getUserConfirmationText } from './email-templates';

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
  bcc?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SendGrid API key not configured - email not sent');
    return false;
  }

  try {
    const emailData: any = {
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
    };
    
    if (params.bcc) {
      emailData.bcc = params.bcc;
    }
    
    await mailService.send(emailData);
    console.log(`Email sent successfully to ${params.to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export function formatQuoteEmail(quoteData: any): { subject: string; html: string; text: string } {
  return {
    subject: `New Quote Request - ${quoteData.propertyAddress}`,
    html: getQuoteEmailHtml(quoteData),
    text: getQuoteEmailText(quoteData),
  };
}

export function formatUserConfirmationEmail(userData: any): { subject: string; html: string; text: string } {
  const firstName = userData.name ? userData.name.split(' ')[0] : 'there';
  return {
    subject: `Quote Request Confirmed - Bourarro Properties`,
    html: getUserConfirmationHtml(firstName),
    text: getUserConfirmationText(firstName),
  };
}
