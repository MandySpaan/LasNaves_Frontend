import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export interface RegisterPayload {
  name: string;
  surname: string;
  startUp?: string;
  email: string;
  dni: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<APIResponse> => {
  return apiClient(`${URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (
  payload: LoginPayload
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return response;
};
