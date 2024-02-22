export type UserRole = "patient" | "doctor" | "admin";

// extend type for Request
declare global {
  namespace Express {
    interface Request {
      userId: string;
      role: UserRole;
    }
  }
}

export interface CommonUserFields {
  username: string;
  email: string;
  password: string;
  full_name: string;
  role: "doctor" | "patient" | "admin";
  phone: string | null;
  date_of_birth: Date | null;
  address: string | null;
}

export interface DoctorFields {
  address: string | null;
  price: string | null;
  description: string | null;
  logo: string | null;
  image: string | null;
  open_closed_time: string | null;
  date_of_birth: Date | null;
  category: "GP" | "Dentist" | "Orthopedic" | "Oncologist" | "Cardiologist";
}

export interface UserType extends CommonUserFields, DoctorFields {}
