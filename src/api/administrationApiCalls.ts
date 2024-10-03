import { generateDailyReportPdf } from "../services/generateReportPdf";
import { uploadReportPdf } from "../services/uploadReportPdf"; // Moved here
import { apiClient, APIResponse } from "./apiClient";

const URL = import.meta.env.VITE_API_URL;

export const getAllReports = async (token: string): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/administration/reports`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createReport = async (token: string): Promise<APIResponse> => {
  const response = await apiClient(`${URL}/administration/create-report`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.success) {
    const reportData = response.data.reportData.savedReport;
    const pdfBlob = generateDailyReportPdf(reportData);

    const uploadResponse = await uploadReportPdf(token, pdfBlob);

    if (!uploadResponse.success) {
      console.error("PDF upload failed:", uploadResponse.error);
    }
  }

  return response;
};
