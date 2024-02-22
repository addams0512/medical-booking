import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import type { UserType } from "../shared/types";

// TODO:
// Create doctor, patient, admin schema
// Check route login-signup-me for role
// Try how to handle image and logo of hospital
//

// commonschema for user
const commonUserSchema = new Schema<UserType>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  full_name: { type: String, required: false },
  role: {
    type: String,
    enum: ["doctor", "patient", "admin"],
    required: true,
    default: "patient",
  },
  address: { type: String, required: false },
});

const doctorSchema = new Schema<UserType>({
  phone: { type: String, required: false },
  address: { type: String, required: false },
  price: { type: String, required: false },
  description: { type: String, required: false },
  logo: { type: String, required: false },
  image: { type: String, required: false },
  open_closed_time: { type: String, required: false },
  date_of_birth: { type: String, required: false },
  category: {
    type: String,
    enum: ["GP", "Dentist", "Orthopedic", "Oncologist", "Cardiologist"],
    default: "GP",
    required: false,
  },
});

// Hash user password before save to database
commonUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<UserType>("User", commonUserSchema);

// Create the doctor model as a subclass of user
const Doctor = User.discriminator("Doctor", doctorSchema);

export { User, Doctor };
