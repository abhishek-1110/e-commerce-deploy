import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import router from "./routes/route.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
Connection();

// Serve static files from the client/build directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "client", "build")));

// API routes
app.use("/", router);

// Serve the React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running successfully on Port ${PORT}`);
});

// DefaultData();

export const paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export const paytmParams = {
  MID: process.env.PAYTM_MID,
  WEBSITE: process.env.PAYTM_WEBSITE,
  CHANNEL_ID: process.env.PAYTM_CHANNEL_ID,
  INDUSTRY_TYPE_ID: process.env.PAYTM_INDUSTRY_TYPE_ID,
  ORDER_ID: uuid(),
  TXN_AMOUNT: "100",
  CUST_ID: process.env.PAYTM_CUST_ID,
  CALLBACK_URL: 'http://localhost:8000/callback',
  EMAIL: 'abhishkbhi@gmail.com',
  MOBILE_NO: '1234567890',
};
