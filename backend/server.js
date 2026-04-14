import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
console.log("MongoDB Connected")
})
.catch(err=>{
console.log("Mongo Error",err)
})

// Test Route
app.get("/",(req,res)=>{
res.send("SkillBridge API Running")
})



app.listen(5000,()=>{
console.log("Server running on port 5000")
})


