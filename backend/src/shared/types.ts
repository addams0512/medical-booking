// extend type for Request
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

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
