import express, { Request, Response } from "express";
import User from "../models/user";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { validationResult, check, Result } from "express-validator";

// TODO: - Tạo route /register call back async function
//    in the function try catch block catch error and return status 500.
// - Validation schema
// - Check if user is existed
// - Create new User from models
// - Await to save the user
// - sign a jsonwebtoken

const router = express.Router();

// route: /api/user/signup
router.post(
  "/signup",
  [
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
    check("email", "Email is required").isString(),
  ],
  async (req: Request, res: Response) => {
    // validation field and return array of error(result)
    const result: Result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ message: result.array() });
    }

    try {
      // Check if user is existed
      let user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        res.status(400).json({ message: "User is already existed" });
      }

      // Create and save user to db
      user = new User(req.body);
      await user.save();
      console.log({ user });

      // Sign jwt
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "1d" },
      );

      // Save cookie
      res.cookie("auth_token", token, {
        maxAge: 900000, // 15 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      // return status ok
      res.status(200).send({ message: "User registered ok" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  },
);

export default router;
