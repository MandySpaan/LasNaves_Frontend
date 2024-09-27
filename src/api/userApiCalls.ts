import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

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
