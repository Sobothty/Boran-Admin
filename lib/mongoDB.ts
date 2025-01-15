import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  // Prevent multiple connections
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  // Check if MONGODB_URL is defined
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  try {
    mongoose.set("strictQuery", true);
    
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Boran_Admin",
      // Additional recommended options
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection failed:", error);
    throw error; // Re-throw to handle it in the calling code
  }
};