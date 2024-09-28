import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export const checkin = async (
  token: string,
  roomId: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/access/check-in/${roomId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
