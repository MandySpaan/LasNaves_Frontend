import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export const getAllAccessHistoryByDate = async (
  token: string,
  startDate: string,
  endDate: string
): Promise<APIResponse> => {
  const response = await apiClient(
    `${URL}/access-history/date?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getRoomAccessHistoryByDate = async (
  token: string,
  roomId: string,
  startDate: string,
  endDate: string
): Promise<APIResponse> => {
  const response = await apiClient(
    `${URL}/access-history/room/${roomId}/date?startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
