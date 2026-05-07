import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try { 
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;