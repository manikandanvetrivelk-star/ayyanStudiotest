const nodemailer = require("nodemailer");
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  ADMIN_EMAIL,
  GMAIL_USER,
  GMAIL_PASS,
} = process.env;

const hasGmailConfig = Boolean(GMAIL_USER && GMAIL_PASS);
const hasSmtpConfig = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);
const EMAIL_CONFIG_MISSING = !MAIL_FROM || !ADMIN_EMAIL || !(hasSmtpConfig || hasGmailConfig);

if (EMAIL_CONFIG_MISSING) {
  console.warn(
    "Missing email configuration. Set MAIL_FROM and ADMIN_EMAIL, and either SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS or GMAIL_USER/GMAIL_PASS in .env."
  );
}

function createSmtpTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER || GMAIL_USER,
      pass: SMTP_PASS || GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function createGmailTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });
}

function ensureEmailConfig() {
  if (EMAIL_CONFIG_MISSING) {
    throw new Error(
      "Email service is not configured. Set MAIL_FROM and ADMIN_EMAIL, and either SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS or GMAIL_USER/GMAIL_PASS in .env."
    );
  }
}

async function sendMail(options) {
  ensureEmailConfig();

  const smtpTransporter = hasSmtpConfig ? createSmtpTransporter() : null;
  const gmailTransporter = hasGmailConfig ? createGmailTransporter() : null;

  if (smtpTransporter) {
    try {
      return await smtpTransporter.sendMail(options);
    } catch (error) {
      console.warn("SMTP send failed, falling back to Gmail SMTP:", error.message);
      if (!gmailTransporter) {
        throw error;
      }
    }
  }

  if (gmailTransporter) {
    return await gmailTransporter.sendMail(options);
  }

  throw new Error("No email transporter is configured.");
}

function buildEmailTemplate({ bookingId, fullName, phone, email, shootType, date, time, location, notes }) {
  return `
    <div style="font-family: Arial, sans-serif; color: #1e1b18; background: #fff; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08);">
        <div style="background: #11100d; color: #f5ede0; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Ayyan Studio and Events Booking Request</h1>
          <p style="color: #c9a85c; margin: 8px 0 0;">Booking ID: ${bookingId}</p>
        </div>
        <div style="background: #faf8f4; padding: 24px; color: #1e1b18;">
          <p style="margin: 0 0 16px;">A new booking request was submitted through the website.</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${[ 
              ["Customer name", fullName],
              ["Mobile number", phone],
              ["Email", email],
              ["Shoot type", shootType],
              ["Booking date", date],
            ]
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; width: 190px; vertical-align: top;">${label}</td>
                    <td style="padding: 10px 0;">${value}</td>
                  </tr>`
              )
              .join("")}
          </table>
        </div>
        <div style="background: #11100d; color: #f5ede0; padding: 16px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">Thank you for choosing Ayyan Studio and Events. Please follow up with the customer as soon as possible.</p>
        </div>
      </div>
    </div>
  `;
}

async function sendBookingNotification(details) {
  const html = buildEmailTemplate(details);

  return sendMail({
    from: MAIL_FROM,
    to: ADMIN_EMAIL,
    subject: `New booking request from ${details.fullName}`,
    html,
  });
}

async function sendCustomerConfirmation(details) {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #1e1b18; background: #fff; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.08);">
        <div style="background: #11100d; color: #f5ede0; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Thanks for booking with Ayyan Studio and Events</h1>
          <p style="color: #c9a85c; margin: 8px 0 0;">Booking ID: ${details.bookingId}</p>
        </div>
        <div style="background: #faf8f4; padding: 24px; color: #1e1b18;">
          <p style="margin: 0 0 16px;">Hi ${details.fullName},</p>
          <p style="margin: 0 0 16px;">We received your booking request and our team will reach out soon to confirm the details.</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${[ 
              ["Shoot type", details.shootType],
              ["Preferred date", details.date],
            ]
              .map(
                ([label, value]) => `
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; width: 190px; vertical-align: top;">${label}</td>
                    <td style="padding: 10px 0;">${value}</td>
                  </tr>`
              )
              .join("")}
          </table>
        </div>
        <div style="background: #11100d; color: #f5ede0; padding: 16px; text-align: center; font-size: 14px;">
          <p style="margin: 0;">We appreciate your trust in Ayyan Studio and Events.</p>
        </div>
      </div>
    </div>
  `;

  return sendMail({
    from: MAIL_FROM,
    to: details.email,
    subject: "Your booking request has been received",
    html,
  });
}

module.exports = { sendBookingNotification, sendCustomerConfirmation };
