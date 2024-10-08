import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export interface editOwnUserDetailsPayload {
  name: string;
  surname: string;
  startUp?: string;
  dni: string;
  phone?: string;
}

export const getAllUsers = async (token: string): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getUserDetails = async (token: string): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/profile/own`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getOwnCurrentAccess = async (
  token: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/current-access/own`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getOwnReservations = async (
  token: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/reservations/own`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateOwnUserDetails = async (
  token: string,
  payload: editOwnUserDetailsPayload
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/profile/own`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response;
};

export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/user/change-password`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: newPassword,
    }),
  });
  return response;
};
