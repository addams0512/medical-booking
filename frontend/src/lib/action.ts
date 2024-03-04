import type { LoginFormData, SignUpFormData, UserType } from "./definitions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

// Fetch current user
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  const user = await response.json();
  return user;
};

// Sign up function to authenticate to backend
export async function signUp(formData: SignUpFormData) {
  const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const signUpData = await response.json();

  if (!response.ok) {
    throw new Error(signUpData.message);
  }

  console.log({ signUpData });
  return signUpData;
}

// Log in function
export async function logIn(formData: LoginFormData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const logInData = await response.json();

  if (!response.ok) {
    throw new Error(logInData.message);
  }

  console.log({ logInData });
  return logInData;
}

export async function logOut() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error during log out");
  }
}

export async function validateToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
}
