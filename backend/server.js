import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const startServer = async () => {
  try {
await mongoose.connect(
      "mongodb+srv://arshad:arshad123@clusterconnect1.jyxhcry.mongodb.net/?appName=Clusterconnect1"
    );
    console.log("MongoDB Connected Successfully");

    app.listen(9080, () => {
      console.log("Server running on port 9080");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

startServer();
