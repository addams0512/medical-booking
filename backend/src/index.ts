import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import signupRoutes from "./routes/signup";
import loginRoutes from "./routes/login";

// connect to db
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// config express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// router for signup /api/users/signup
app.use("/api/users", signupRoutes);
// router for login /api/auth/login
app.use("/api/auth", loginRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
