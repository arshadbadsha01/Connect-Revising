import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postsRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(postsRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))

const startServer = async () => {
  try {
   const connectDB = await mongoose.connect(
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
