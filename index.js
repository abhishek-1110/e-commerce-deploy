// express acts as a server
import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuid} from "uuid";
import * as path from "path";
import { fileURLToPath } from "url";

// intializing

// creating server
// three arguments - port, callback function

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
const PORT = process.env.PORT || 8000;

Connection();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
  

  app.use(express.static(path.join(__dirname, 'dist')))

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist'))
  });
}

app.listen(PORT, () =>
  console.log(`Server is running successfully on Port ${PORT}`)
);

// DefaultData();

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID;
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID'] = uuid();
paytmParams['TXN_AMOUNT'] = '100'
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback';
paytmParams['EMAIL'] = 'abhishkbhi@gmail.com';
paytmParams['MOBILE_NO'] = '1234567890';