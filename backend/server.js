import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json());

/* Test Route */
app.get("/", (req, res) => {
  res.send("Backend Server Running");
});

/* Start Server */
const start = async () => {
//   try {
    await mongoose.connect("mongodb+srv://arshad:1234567890sr@clusterconnect1.jyxhcry.mongodb.net/clusterconnect1");
);
    // console.log("✅ MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
//   } catch (error) {
//     console.error("❌ MongoDB Connection Error:", error.message);
//   }
};

start();
