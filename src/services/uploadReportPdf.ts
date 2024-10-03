export const uploadReportPdf = async (
  token: string,
  pdfBlob: Blob
): Promise<any> => {
  const formData = new FormData();
  formData.append("pdf", pdfBlob, "daily-report.pdf");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/administration/upload-report`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  const result = await response.json();
  return result;
};
