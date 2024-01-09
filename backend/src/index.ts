import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import signupRoutes from "./routes/signup";
import loginRoutes from "./routes/login";
import cookieParser from "cookie-parser";

// connect to db
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// config express
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

// router for signup /api/users/signup
app.use("/api/users", signupRoutes);

// router for login /api/auth/login
// router for validate token /api/auth/validate-token
app.use("/api/auth", loginRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
