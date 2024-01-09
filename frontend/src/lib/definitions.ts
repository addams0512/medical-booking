export type SignUpFormData = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type MessageToast = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContext = {
  showToast: (messageToast: MessageToast) => void;
  isLoggedIn: boolean;
};
