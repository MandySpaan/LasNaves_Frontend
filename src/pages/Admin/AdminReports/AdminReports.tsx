import React, { useState } from "react";
import { createReport } from "../../../api/administrationApiCalls";

const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreateReport = async () => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No valid token found.");
        return;
      }

      const response = await createReport(token);
      if (response.success) {
        setSuccessMessage("Report created and uploaded successfully!");
      } else {
        setErrorMessage(response.error || "Failed to create report.");
      }
    } catch (error) {
      setErrorMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Generate Daily Report</h2>
      <button onClick={handleCreateReport} disabled={loading}>
        {loading ? "Generating..." : "Create Report"}
      </button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AdminReports;
