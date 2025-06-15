import dotenv from "dotenv";

import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routs/user.route.js"
import cookieParser from "cookie-parser";
import messageRoute from "./routs/message.route.js"
import {app,server} from "./SocketIO/server.js"
import path from "path";

const PORT = process.env.PORT || 5002;
dotenv.config();

const URI =process.env.MONGO_DB;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.log("mongodb is not connected", err);
  }
};

connectDB();




app.use("/api/user" , userRoute)
app.use("/api/message" , messageRoute);

if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, "/frontend/dist")));

 app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(dirPath, "frontend", "dist", "index.html"));
  });
}



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
