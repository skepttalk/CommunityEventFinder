import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI as string, {
      family: 4 
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Mongo Error:", error);
    process.exit(1);
  }
};

export default connectDB;