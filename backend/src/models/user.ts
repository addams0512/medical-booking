import { Schema, Types, model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
  username: string;
  password: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  date_of_birth: Date | null;
  updated_at: Date;
  created_at: Date;
};

const userSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  full_name: { type: String, required: false },
  phone_number: { type: String, required: false },
  date_of_birth: { type: Date, required: false, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
  created_at: { type: Date, required: true, default: Date.now },
});

// Hash user password before save to database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<UserType>("User", userSchema);

export default User;
