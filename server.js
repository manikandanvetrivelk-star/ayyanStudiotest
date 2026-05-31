const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();

const { sendBookingNotification, sendCustomerConfirmation } = require("./emailService");

const app = express();
const PORT = process.env.PORT || 5000;
const hasGmailConfig = process.env.GMAIL_USER && process.env.GMAIL_PASS;
const hasSmtpConfig =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  (process.env.SMTP_USER || process.env.GMAIL_USER) &&
  (process.env.SMTP_PASS || process.env.GMAIL_PASS);
const EMAIL_CONFIG_MISSING = !process.env.MAIL_FROM || !process.env.ADMIN_EMAIL || !(hasSmtpConfig || hasGmailConfig);

app.set("trust proxy", 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(cors());
app.use(express.json());
app.use(apiLimiter);

const VALID_SHOOT_TYPES = [
  "Maternity",
  "Newborn",
  "Toddler",
  "Wedding",
  "Portrait",
  "Fashion",
  "Product",
  "Event",
  "Surprise",
];

function validateBooking(payload) {
  const errors = [];
  const {
    fullName,
    phone,
    email,
    shootType,
    date,
    time,
    location,
  } = payload;

  if (!fullName || !fullName.trim()) errors.push("Full name is required.");
  if (!phone || !/^[0-9]{10,15}$/.test(phone.trim())) {
    errors.push("Mobile number is required and should contain 10–15 digits.");
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("A valid email address is required.");
  }
  if (!shootType || !VALID_SHOOT_TYPES.includes(shootType)) {
    errors.push("Please select a valid shoot type.");
  }
  if (!date) {
    errors.push("Preferred booking date is required.");
  } else {
    const requestDate = new Date(date);
    if (Number.isNaN(requestDate.getTime())) {
      errors.push("Preferred booking date must be a valid date.");
    }
  }

  return errors;
}

app.post("/api/book-session", async (req, res) => {
  if (EMAIL_CONFIG_MISSING) {
    return res.status(500).json({
      success: false,
      message:
        "Booking service is not configured. Set GMAIL_USER, GMAIL_PASS, MAIL_FROM, and ADMIN_EMAIL in .env.",
    });
  }

  const bookingData = req.body;
  const validationErrors = validateBooking(bookingData);

  if (validationErrors.length > 0) {
    return res.status(400).json({ success: false, message: validationErrors.join(" ") });
  }

  const bookingId = `RM-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

  try {
    await sendBookingNotification({ ...bookingData, bookingId });
    await sendCustomerConfirmation({ ...bookingData, bookingId });

    return res.json({ success: true, bookingId, message: "Booking request submitted successfully." });
  } catch (error) {
    console.error("Booking API error:", error.message || error);
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to submit booking at the moment. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Booking API running on http://localhost:${PORT}`);
});
