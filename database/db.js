import mongoose from "mongoose";

import { MONGO_URI } from "../config/dev.js";

export const Connection = async () => {
  const URL = MONGO_URI;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database", error.message);
  }
};
export default Connection;
