import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export const getAllRooms = async (): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/room/all`, {
    method: "GET",
  });
  return response;
};
