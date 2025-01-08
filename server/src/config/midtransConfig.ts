import Midtrans from "midtrans-client";

// Initialize Core API Client
const coreApi = new Midtrans.Snap({
  isProduction: false, // Change to `true` if in production mode
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default coreApi;
