import express, { Request, Response } from "express";
import User from "../models/user";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { validationResult, check, Result } from "express-validator";
import bcrypt from "bcryptjs";

// TODO:
//  - Create a login route
// - Validation field "email" and "password"
// - Create a variable for email and password that requested
// - Check if "email", "password"
// - sign jwt
// - save cookie
// - return json user.id
// - create route /api/auth/login
//
const router = express.Router();

// route: /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    // validation field and return array of error
    const result: Result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const { email, password } = req.body;

    try {
      // Check if user is in db
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // sign jwt
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" },
      );

      res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 900000,
      });

      // return status 200 and user.id
      res.status(200).json({ userId: user.id });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  },
);

export default router;
