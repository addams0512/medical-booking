import type { LoginFormData, SignUpFormData } from "./definitions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
}

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
