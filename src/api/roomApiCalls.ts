import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export const getAllRooms = async (): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/room/all`, {
    method: "GET",
  });
  return response;
};

export const getCurrentOccupancy = async (
  roomId: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/room/occupancy/${roomId}`, {
    method: "GET",
  });
  return response;
};

export const getOccupancyUsersList = async (
  token: string,
  roomId: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/room/status/${roomId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
