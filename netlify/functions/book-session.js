const { sendBookingNotification, sendCustomerConfirmation } = require("../../emailService");

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
  const { fullName, phone, email, shootType, date } = payload;

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

function buildErrorResponse(statusCode, payload) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return buildErrorResponse(405, {
      success: false,
      message: "Method not allowed. Use POST for this endpoint.",
    });
  }

  let bookingData;
  try {
    bookingData = JSON.parse(event.body || "{}");
  } catch (error) {
    return buildErrorResponse(400, {
      success: false,
      message: "Invalid JSON payload.",
    });
  }

  const validationErrors = validateBooking(bookingData);
  if (validationErrors.length > 0) {
    return buildErrorResponse(400, {
      success: false,
      message: validationErrors.join(" "),
    });
  }

  const bookingId = `RM-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;

  try {
    await sendBookingNotification({ ...bookingData, bookingId });
    await sendCustomerConfirmation({ ...bookingData, bookingId });

    return buildErrorResponse(200, {
      success: true,
      bookingId,
      message: "Booking request submitted successfully.",
    });
  } catch (error) {
    console.error("Booking function error:", error?.message || error);
    return buildErrorResponse(500, {
      success: false,
      message:
        error?.message || "Unable to submit booking at the moment. Please try again later.",
    });
  }
};
