export type UserRole = "doctor" | "patient" | "admin";

export type UserType = {
  username: string;
  password: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  date_of_birth: Date | null;
  updated_at: Date;
  created_at: Date;
  role: "doctor" | "patient" | "admin";
  category: "GP" | "Dentist" | "Orthopedic" | "Oncologist" | "Cardiologist";
};

export type SignUpFormData = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  role: UserRole;
};

export type LoginFormData = {
  email: string;
  password: string;
  role: UserRole;
};

export type MessageToast = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  isLoggedIn: boolean;
};
