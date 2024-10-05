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

export const checkout = async (
  token: string,
  roomId: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/access/check-out/${roomId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const reservation = async (
  token: string,
  roomId: string,
  entryDateTimeRaw: Date,
  exitDateTimeRaw: Date
): Promise<APIResponse> => {
  const entryDateTimeStr = entryDateTimeRaw.toISOString().split(".")[0] + "Z";
  const exitDateTimeStr = exitDateTimeRaw.toISOString().split(".")[0] + "Z";
  const response = await apiClient(`${URL}/access/reserve/${roomId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      entryDateTime: entryDateTimeStr,
      exitDateTime: exitDateTimeStr,
    }),
  });
  return response;
};

export const cancelReservation = async (
  token: string,
  accessId: string
): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/access/cancel/${accessId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
