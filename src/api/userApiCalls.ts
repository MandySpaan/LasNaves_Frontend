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
