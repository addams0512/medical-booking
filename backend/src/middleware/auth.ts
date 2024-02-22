import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { UserRole } from "../shared/types";
// TODO:
// verifyToken:
//  - get token by request to frontend
//  - decode token
//  - create new userId depend on token
//  - call nextfunction

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export const checkRole =
  (roles: UserRole) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user?.role) {
      return res.status(401).json("User role not found. Access denied.");
    }

    if (!roles.includes(user.role)) {
      return res
        .status(401)
        .json("Sorry, you do not have access to this route");
    }

    next();
  };
