import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToMongoDB = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}