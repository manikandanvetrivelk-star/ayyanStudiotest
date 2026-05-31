import axios from "axios";

export async function submitBookingRequest(payload) {
  const response = await axios.post("/api/book-session", payload);
  return response.data;
}
