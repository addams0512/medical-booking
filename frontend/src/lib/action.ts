import type { RegisterFormData } from "./definitions";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Sign up function to authenticate to backend
export async function signUp(formData: RegisterFormData) {
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
