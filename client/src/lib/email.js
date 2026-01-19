import nodemailer from 'nodemailer';

// Create transporter using SMTP configuration
const createTransporter = () => {
  const host = process.env.SMTP_HOST || process.env.NEXT_PUBLIC_SMTP_HOST;
  const user = process.env.SMTP_USER || process.env.NEXT_PUBLIC_SMTP_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.NEXT_PUBLIC_SMTP_PASSWORD;
  const port = parseInt(process.env.SMTP_PORT || process.env.NEXT_PUBLIC_SMTP_PORT || '587');
  const isSecure = port === 465;

  if (!host || !user || !pass) {
    console.error('[SMTP Config] ❌ Missing SMTP configuration!');
    console.error(`[SMTP Config] Host: ${host ? 'SET' : 'MISSING'}`);
    console.error(`[SMTP Config] User: ${user ? 'SET' : 'MISSING'}`);
    console.error(`[SMTP Config] Password: ${pass ? 'SET' : 'MISSING'}`);
    throw new Error('SMTP configuration is incomplete. Please check environment variables.');
  }

  const config = {
    host: host,
    port: port,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
    // Reduced timeouts for faster failure in production
    connectionTimeout: 10000, // 10 seconds connection timeout
    greetingTimeout: 5000, // 5 seconds greeting timeout
    socketTimeout: 10000, // 10 seconds socket timeout
    // Retry configuration
    pool: false, // Don't use connection pooling for better reliability
  };

  // TLS configuration for non-secure ports (587)
  if (!isSecure) {
    config.tls = {
      rejectUnauthorized: false, // Allow self-signed certificates
      minVersion: 'TLSv1.2', // Use modern TLS version
    };
  }

  console.log(`[SMTP Config] ✅ Transporter created successfully`);
  return nodemailer.createTransport(config);
};

// Send email function with retry logic (blocking)
export async function sendOtpEmail({ to, subject, text, html }, retries = 2) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const transporter = createTransporter();

      const fromEmail =
        process.env.SMTP_FROM_EMAIL ||
        process.env.NEXT_PUBLIC_FROM_EMAIL ||
        process.env.SMTP_USER ||
        process.env.NEXT_PUBLIC_SMTP_USER ||
        'info.premierpenny@gmail.com';

      const mailOptions = {
        from: fromEmail,
        to: to,
        subject: subject,
        text: text,
        html: html,
      };

      const info = await transporter.sendMail(mailOptions);

      return { success: true, messageId: info.messageId };
    } catch (error) {
      lastError = error;
      console.error(`[Email] ❌ Error sending email (attempt ${attempt + 1}/${retries + 1}):`, error.message);
      console.error(`[Email] Error code: ${error.code}`);
      console.error(`[Email] Error command: ${error.command}`);
      console.error(`[Email] Full error:`, error);

      // If it's the last attempt, throw the error
      if (attempt === retries) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      const delay = 1000 * (attempt + 1); // 1s, 2s
      console.log(`[Email] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

// Send email asynchronously without blocking (fire and forget)
export function sendOtpEmailAsync({ to, subject, text, html }) {

  // Use Promise.resolve().then() to ensure it runs asynchronously
  // This ensures the email sending starts even after API response is sent
  Promise.resolve().then(async () => {
    try {

      const result = await sendOtpEmail({ to, subject, text, html });

    } catch (error) {
      console.error(`[Email Queue] ❌ Failed to send email to: ${to}`);
      console.error(`[Email Queue] Error message: ${error.message}`);
      console.error(`[Email Queue] Error code: ${error.code}`);
      console.error(`[Email Queue] Full error:`, error);

      // Try one more time after a delay
      setTimeout(async () => {
        try {

          const retryResult = await sendOtpEmail({ to, subject, text, html }, 1);
          console.log(`[Email Queue] ✅ Retry successful for: ${to}, MessageId: ${retryResult.messageId}`);
        } catch (retryError) {
          console.error(`[Email Queue] ❌ Retry also failed for: ${to}`);
          console.error(`[Email Queue] Retry error: ${retryError.message}`);
          console.error(`[Email Queue] Retry error code: ${retryError.code}`);
        }
      }, 5000); // Retry after 5 seconds
    }
  }).catch((err) => {
    console.error(`[Email Queue] 💥 Unhandled error in email queue:`, err);
  });

  console.log(`[Email Queue] ✅ Email queued for sending to: ${to}`);
  return { success: true, message: 'Email queued for sending' };
}

// Email template for admin notifications
export function getAdminEmailTemplate(formData) {
  const { name, email, phone, message, subject } = formData;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.5px; }
        .header-icon { font-size: 48px; margin-bottom: 10px; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .info-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px; }
        .info-row { display: flex; align-items: flex-start; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e9ecef; }
        .info-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .info-label { font-weight: 600; color: #396A9F; min-width: 120px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { flex: 1; color: #333333; font-size: 15px; word-break: break-word; }
        .info-value a { color: #396A9F; text-decoration: none; }
        .info-value a:hover { text-decoration: underline; }
        .message-box { background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-left: 4px solid #396A9F; padding: 20px; margin-top: 25px; border-radius: 4px; }
        .message-box-title { font-weight: 600; color: #396A9F; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .message-content { color: #555555; font-size: 15px; line-height: 1.8; white-space: pre-wrap; }
        .footer { background-color: #2D3E50; color: #ffffff; padding: 25px 30px; text-align: center; font-size: 12px; }
        .footer p { margin: 5px 0; color: #b0b0b0; }
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .header { padding: 30px 20px; }
          .info-row { flex-direction: column; }
          .info-label { margin-bottom: 8px; min-width: auto; }
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f4f4f4; padding: 20px 0;">
        <div class="email-wrapper">
          <div class="header">
            <div class="header-icon">📧</div>
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="info-section">
              <div class="info-row">
                <div class="info-label">Name</div>
                <div class="info-value">${name}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Email</div>
                <div class="info-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              <div class="info-row">
                <div class="info-label">Phone</div>
                <div class="info-value">${phone || '<span style="color: #999;">Not provided</span>'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Subject</div>
                <div class="info-value">${subject || 'General Inquiry'}</div>
              </div>
            </div>
            <div class="message-box">
              <div class="message-box-title">Message</div>
              <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Borrowww</strong></p>
            <p>221, 2nd Floor, JMD Megapolis, Sector 48, Sohan Road, Gurgaon 122002</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email template for user thank you message
export function getUserThankYouTemplate({ name }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: #ffffff; padding: 50px 30px; text-align: center; }
        .header-icon { font-size: 64px; margin-bottom: 15px; }
        .header h1 { font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .content p { margin-bottom: 20px; color: #555555; font-size: 16px; line-height: 1.8; }
        .content p:last-child { margin-bottom: 0; }
        .highlight-box { background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-left: 4px solid #396A9F; padding: 25px; margin: 30px 0; border-radius: 4px; }
        .highlight-box p { margin-bottom: 12px; font-size: 15px; }
        .highlight-box p:last-child { margin-bottom: 0; }
        .contact-info { margin: 20px 0; }
        .contact-info strong { color: #396A9F; display: inline-block; min-width: 80px; }
        .signature { margin-top: 30px; color: #333333; }
        .signature strong { color: #396A9F; }
        .footer { background-color: #2D3E50; color: #ffffff; padding: 30px; text-align: center; }
        .footer p { margin: 8px 0; color: #b0b0b0; font-size: 13px; }
        .footer p strong { color: #ffffff; }
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .header { padding: 40px 20px; }
          .header h1 { font-size: 24px; }
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f4f4f4; padding: 20px 0;">
        <div class="email-wrapper">
          <div class="header">
            <div class="header-icon">✓</div>
            <h1>Thank You for Contacting Borrowww</h1>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us! We have successfully received your message and our team will review it shortly.</p>
            <p>We understand the importance of your inquiry and will get back to you as soon as possible, typically within <strong style="color: #396A9F;">24-48 hours</strong>.</p>
            <div class="highlight-box">
              <p style="font-weight: 600; color: #396A9F; margin-bottom: 15px;">Need immediate assistance?</p>
              <div class="contact-info">
                <p><strong>Phone:</strong> +91 9560069525 or +91 8264111345</p>
                <p><strong>Email:</strong> info.premierpenny@gmail.com</p>
              </div>
            </div>
            <p>We appreciate your trust in Borrowww and look forward to assisting you with your financial needs.</p>
            <div class="signature">
              <p>Best regards,</p>
              <p><strong>The Borrowww Team</strong></p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Borrowww</strong></p>
            <p>221, 2nd Floor, JMD Megapolis, Sector 48, Sohan Road, Gurgaon 122002</p>
            <p style="margin-top: 20px; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email template for credit check request
export function getCreditCheckEmailTemplate({ firstName, mobileNumber }) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.5px; }
        .header-icon { font-size: 48px; margin-bottom: 10px; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .info-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px; }
        .info-row { display: flex; align-items: flex-start; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e9ecef; }
        .info-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .info-label { font-weight: 600; color: #396A9F; min-width: 140px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { flex: 1; color: #333333; font-size: 15px; word-break: break-word; }
        .consent-badge { display: inline-block; background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: #ffffff; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .footer { background-color: #2D3E50; color: #ffffff; padding: 25px 30px; text-align: center; font-size: 12px; }
        .footer p { margin: 5px 0; color: #b0b0b0; }
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .header { padding: 30px 20px; }
          .info-row { flex-direction: column; }
          .info-label { margin-bottom: 8px; min-width: auto; }
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f4f4f4; padding: 20px 0;">
        <div class="email-wrapper">
          <div class="header">
            <div class="header-icon">💳</div>
            <h1>New Credit Check Request</h1>
          </div>
          <div class="content">
            <div class="info-section">
              <div class="info-row">
                <div class="info-label">Name</div>
                <div class="info-value">${firstName}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Mobile Number</div>
                <div class="info-value">${mobileNumber}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Consent Given</div>
                <div class="info-value"><span class="consent-badge">✓ Yes</span></div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p><strong>Borrowww</strong></p>
            <p>221, 2nd Floor, JMD Megapolis, Sector 48, Sohan Road, Gurgaon 122002</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Email template for home loan inquiry
export function getHomeLoanEmailTemplate({ name, phone, city, propertyType, loanAmount, duration, monthlyIncome, employmentType, remarks, durationText }) {
  const formatCurrency = (amount) => {
    if (!amount) return 'Not provided';
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
        .header { background: linear-gradient(135deg, #396A9F 0%, #2D3E50 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.5px; }
        .header-icon { font-size: 48px; margin-bottom: 10px; }
        .content { padding: 40px 30px; background-color: #ffffff; }
        .info-section { background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px; }
        .info-row { display: flex; align-items: flex-start; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e9ecef; }
        .info-row:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
        .info-label { font-weight: 600; color: #396A9F; min-width: 160px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { flex: 1; color: #333333; font-size: 15px; word-break: break-word; }
        .amount-highlight { color: #28a745; font-weight: 600; font-size: 16px; }
        .message-box { background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%); border-left: 4px solid #396A9F; padding: 20px; margin-top: 25px; border-radius: 4px; }
        .message-box-title { font-weight: 600; color: #396A9F; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .message-content { color: #555555; font-size: 15px; line-height: 1.8; }
        .footer { background-color: #2D3E50; color: #ffffff; padding: 25px 30px; text-align: center; font-size: 12px; }
        .footer p { margin: 5px 0; color: #b0b0b0; }
        @media only screen and (max-width: 600px) {
          .content { padding: 30px 20px; }
          .header { padding: 30px 20px; }
          .info-row { flex-direction: column; }
          .info-label { margin-bottom: 8px; min-width: auto; }
        }
      </style>
    </head>
    <body>
      <div style="background-color: #f4f4f4; padding: 20px 0;">
        <div class="email-wrapper">
          <div class="header">
            <div class="header-icon">🏠</div>
            <h1>New Home Loan Inquiry</h1>
          </div>
          <div class="content">
            <div class="info-section">
              <div class="info-row">
                <div class="info-label">Name</div>
                <div class="info-value">${name}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Phone</div>
                <div class="info-value">${phone}</div>
              </div>
              <div class="info-row">
                <div class="info-label">City</div>
                <div class="info-value">${city || '<span style="color: #999;">Not provided</span>'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Property Type</div>
                <div class="info-value">${propertyType || '<span style="color: #999;">Not provided</span>'}</div>
              </div>
              <div class="info-row">
                <div class="info-label">Loan Amount</div>
                <div class="info-value"><span class="amount-highlight">${formatCurrency(loanAmount)}</span></div>
              </div>
              <div class="info-row">
                <div class="info-label">Loan Duration</div>
                <div class="info-value">${durationText} <span style="color: #999;">(${duration || 'N/A'} months)</span></div>
              </div>
              <div class="info-row">
                <div class="info-label">Monthly Income</div>
                <div class="info-value"><span class="amount-highlight">${formatCurrency(monthlyIncome)}</span></div>
              </div>
              <div class="info-row">
                <div class="info-label">Employment Type</div>
                <div class="info-value">${employmentType || '<span style="color: #999;">Not provided</span>'}</div>
              </div>
              ${remarks ? `
              <div class="message-box">
                <div class="message-box-title">Remarks</div>
                <div class="message-content">${remarks}</div>
              </div>
              ` : ''}
            </div>
          </div>
          <div class="footer">
            <p><strong>Borrowww</strong></p>
            <p>221, 2nd Floor, JMD Megapolis, Sector 48, Sohan Road, Gurgaon 122002</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
