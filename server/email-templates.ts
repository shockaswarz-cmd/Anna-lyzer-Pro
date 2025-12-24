export function getQuoteEmailHtml(quoteData: any): string {
  return `
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
}

export function getQuoteEmailText(quoteData: any): string {
  return `
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
}

export function getUserConfirmationHtml(firstName: string): string {
  return `
    <div style="font-family: 'Inter', 'Segoe UI', sans-serif; max-width: 680px; margin: 0 auto; background: hsl(210, 15%, 12%); border-radius: 0; overflow: hidden;">
      <div style="background: hsl(210, 20%, 8%); padding: 60px 40px 50px; text-align: center; position: relative; border-bottom: 1px solid hsl(45, 65%, 75%);">
        <div style="margin-bottom: 30px;">
          <img src="https://bourarroproperties.uk/logo.png" alt="Bourarro Properties Logo" style="height: 65px; width: auto; opacity: 0.95;" />
        </div>
        <h1 style="font-family: 'Playfair Display', Georgia, serif; color: hsl(45, 65%, 75%); font-weight: 600; margin: 0 0 20px 0; font-size: 38px; letter-spacing: -0.5px; line-height: 1.2;">Bourarro Properties</h1>
        <h2 style="font-family: 'Inter', sans-serif; color: hsl(0, 0%, 100%); font-weight: 400; margin: 0; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">Quote Request Received</h2>
        <div style="height: 1px; width: 120px; background: hsl(45, 65%, 75%); margin: 35px auto 0; opacity: 0.8;"></div>
      </div>
      
      <div style="padding: 50px 45px; background: hsl(210, 15%, 12%);">
        <div style="text-align: left; margin-bottom: 45px; padding-left: 20px; border-left: 2px solid hsl(45, 65%, 75%);">
          <h3 style="font-family: 'Playfair Display', Georgia, serif; color: hsl(0, 0%, 100%); margin: 0; font-size: 32px; font-weight: 500; letter-spacing: -0.8px; line-height: 1.3;">Dear ${firstName},</h3>
        </div>
        
        <div style="margin-bottom: 50px;">
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 85%); font-size: 18px; line-height: 1.8; margin: 0 0 30px 0; font-weight: 400;">
            Thank you for your interest in our <span style="color: hsl(45, 65%, 75%); font-weight: 500;">exclusive property investment opportunities</span>.
          </p>
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 16px; line-height: 1.7; margin: 0;">
            Your request has been received and assigned to one of our senior investment advisors. You can expect a personal consultation within 24 hours to discuss your bespoke investment strategy.
          </p>
        </div>
        
        <div style="background: hsl(210, 12%, 25%); padding: 40px 35px; margin: 45px 0; border: 1px solid hsl(45, 65%, 75%); border-width: 1px 0;">
          <h4 style="font-family: 'Playfair Display', Georgia, serif; color: hsl(0, 0%, 100%); font-size: 24px; font-weight: 500; margin: 0 0 20px 0; letter-spacing: -0.5px;">Exclusive Property Portfolio</h4>
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
            Discover our curated collection of premium investment properties, each offering guaranteed returns and hassle-free management.
          </p>
          <a href="https://bourarro.lodgify.com/" style="font-family: 'Inter', sans-serif; background: hsl(45, 65%, 75%); color: hsl(210, 20%, 8%); padding: 16px 40px; text-decoration: none; border-radius: 0; font-weight: 500; display: inline-block; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; border: 1px solid hsl(45, 65%, 75%);">View Portfolio</a>
        </div>
        
        <div style="background: hsl(210, 20%, 8%); padding: 40px 35px; margin: 45px 0; border-left: 3px solid hsl(45, 65%, 75%);">
          <h4 style="font-family: 'Playfair Display', Georgia, serif; color: hsl(45, 65%, 75%); font-size: 24px; font-weight: 500; margin: 0 0 20px 0; letter-spacing: -0.5px;">Elite Investor Network</h4>
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 16px; line-height: 1.7; margin: 0 0 30px 0;">
            Join our exclusive community of discerning investors. Access private opportunities, market intelligence, and networking with industry leaders.
          </p>
          <a href="https://chat.whatsapp.com/DR10Vs1zkXO07s7C0VMymb?mode=ems_copy_t" style="font-family: 'Inter', sans-serif; background: transparent; color: hsl(45, 65%, 75%); padding: 16px 40px; text-decoration: none; border-radius: 0; font-weight: 500; display: inline-block; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; border: 1px solid hsl(45, 65%, 75%);">Request Invitation</a>
        </div>
        
        <div style="text-align: center; margin: 55px 0 40px; padding: 35px 0; border-top: 1px solid hsl(210, 8%, 25%);">
          <p style="font-family: 'Playfair Display', Georgia, serif; color: hsl(210, 8%, 85%); font-size: 20px; line-height: 1.6; margin: 0; font-weight: 400; font-style: italic;">
            "Delivering <span style="color: hsl(45, 65%, 75%);">guaranteed returns</span> through premium property investment solutions."
          </p>
        </div>
      </div>
      
      <div style="background: hsl(210, 20%, 8%); padding: 50px 45px; border-top: 2px solid hsl(45, 65%, 75%);">
        <div style="text-align: center; margin-bottom: 35px;">
          <img src="https://bourarroproperties.uk/logo.png" alt="Bourarro Properties" style="height: 50px; width: auto; opacity: 0.9;" />
        </div>
        <div style="text-align: center; margin-bottom: 35px;">
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 16px; line-height: 1.4; margin: 0 0 10px 0; font-weight: 400;">Sincerely,</p>
          <p style="font-family: 'Playfair Display', Georgia, serif; color: hsl(45, 65%, 75%); font-size: 24px; line-height: 1.3; margin: 0; font-weight: 500; letter-spacing: -0.3px;">The Bourarro Properties Team</p>
        </div>
        <div style="text-align: center; margin-bottom: 30px;">
          <div style="height: 1px; width: 100px; background: hsl(45, 65%, 75%); margin: 0 auto; opacity: 0.6;"></div>
        </div>
        <div style="text-align: center;">
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 14px; margin: 0 0 10px 0;"><a href="mailto:info@bourarroproperties.co.uk" style="color: hsl(45, 65%, 75%); text-decoration: none; font-weight: 500;">info@bourarroproperties.co.uk</a></p>
          <p style="font-family: 'Inter', sans-serif; color: hsl(210, 8%, 75%); font-size: 14px; margin: 0;"><a href="https://bourarroproperties.uk" style="color: hsl(210, 8%, 85%); text-decoration: none; font-weight: 500;">bourarroproperties.uk</a></p>
        </div>
        <div style="text-align: center; margin-top: 35px; padding-top: 25px; border-top: 1px solid hsl(210, 12%, 25%);">
          <p style="font-family: 'Playfair Display', Georgia, serif; color: hsl(210, 8%, 65%); font-size: 14px; margin: 0; font-weight: 400; font-style: italic;">Exclusive Property Investment Solutions</p>
        </div>
      </div>
      
      <div style="background: hsl(210, 15%, 12%); text-align: center; padding: 30px 45px; border-top: 1px solid hsl(210, 12%, 20%); color: hsl(210, 8%, 55%); font-size: 11px;">
        <p style="font-family: 'Inter', sans-serif; margin: 0 0 10px 0; font-weight: 500; letter-spacing: 0.5px;">BOURARRO PROPERTIES LTD</p>
        <p style="font-family: 'Inter', sans-serif; margin: 0 0 15px 0; line-height: 1.5;">Unit 4536, 182-184 High Street North<br>London, England, E6 2JA, United Kingdom</p>
        <p style="font-family: 'Inter', sans-serif; margin: 0 0 5px 0;">This is a transactional email confirming your quote request.</p>
        <p style="font-family: 'Inter', sans-serif; margin: 0;">You received this email because you requested a quote on our website.</p>
      </div>
    </div>
  `;
}

export function getUserConfirmationText(firstName: string): string {
  return `
Dear ${firstName},

Thank you for your interest in our exclusive property investment opportunities.

Your request has been received and assigned to one of our senior investment advisors. You can expect a personal consultation within 24 hours to discuss your bespoke investment strategy.

EXCLUSIVE PROPERTY PORTFOLIO
Discover our curated collection of premium investment properties, each offering guaranteed returns and hassle-free management.
View Portfolio: https://bourarro.lodgify.com/

ELITE INVESTOR NETWORK
Join our exclusive community of discerning investors. Access private opportunities, market intelligence, and networking with industry leaders.
Request Invitation: https://chat.whatsapp.com/DR10Vs1zkXO07s7C0VMymb?mode=ems_copy_t

"Delivering guaranteed returns through premium property investment solutions."

Sincerely,
The Bourarro Properties Team

Contact Information:
info@bourarroproperties.co.uk
bourarroproperties.uk

---
BOURARRO PROPERTIES LTD
Unit 4536, 182-184 High Street North
London, England, E6 2JA, United Kingdom

This is a transactional email confirming your quote request.
  `;
}
