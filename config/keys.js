import { MONGO_URI } from "./prod.js";

const config = process.env.NODE_ENV === "production" ? MONGO_URI : MONGO_URI;

export default config;
