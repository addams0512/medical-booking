import express, { Request, Response } from "express";
import { User, Doctor } from "../models/user";
import "dotenv/config";
import { validationResult, check, Result } from "express-validator";
import { checkRole, verifyToken } from "../middleware/auth";

// TODO: - Tạo route /register call back async function
//    in the function try catch block catch error and return status 500.
// - Validation schema
// - Check if user is existed
// - Create new User from models
// - Await to save the user
// - sign a jsonwebtoken

const router = express.Router();

type UserRole = "doctor" | "patient" | "admin";

export const validateRole = (value: UserRole) => {
  if (!["doctor", "patient", "admin"].includes(value)) {
    throw new Error("Invalid role");
  }
  return true;
};

// route: /api/user/me
router.get(
  "/me",
  verifyToken,
  checkRole,
  async (req: Request, res: Response) => {
    const userId = req.body;
    try {
      const user = User.findById(userId).select("-password");
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.log({ error });
      res.status(500).json({ message: "Something went wrong" });
    }
  },
);

// route: /api/user/signup
router.post(
  "/signup",
  [
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
    check("email", "Email is required").isString(),
    check("role", "Role is required").custom(validateRole),
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
      let doctor = await Doctor.findOne({
        email: req.body.email,
      });
      if (user || doctor) {
        res.status(400).json({ message: "User is already existed" });
      }

      // Create and save user or to db
      if (req.body.role === "doctor") {
        doctor = new Doctor(req.body);
        await doctor.save();
      } else {
        user = new User(req.body);
        await user.save();
      }

      console.log({ user });
      console.log({ doctor });

      // return status ok
      res.status(200).send({ message: "User registered ok" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
    }
  },
);

export default router;
