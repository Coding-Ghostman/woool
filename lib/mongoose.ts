import { log } from "console";
import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDB() {
	mongoose.set("strictQuery", true);

	if (!process.env.MONGODB_URL) return log("MONGODB URL not found");
	if (isConnected) return log("Already connected to the MONGODB");

	try {
		await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.log(error);
    
  }
}
