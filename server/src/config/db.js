import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(`Error in database connectio - ${error}`);
  }
};

export default connectDB;
