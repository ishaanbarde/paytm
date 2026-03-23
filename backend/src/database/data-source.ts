import mongoose from "mongoose";

const mongoURI = process.env.MONGO_DB_CONNECTION_STRING;

export const connectDB = async () => {
  try {
    await mongoose.connect(String(mongoURI));
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
  }
};
