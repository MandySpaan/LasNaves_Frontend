import { useEffect, useState } from "react";
import {
  createReport,
  getAllReports,
} from "../../../api/administrationApiCalls";
import "./AdminReports.css";

const AdminReports: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]);

  const fetchReports = async (token: string) => {
    try {
      const response = await getAllReports(token);
      if (response.success) {
        setReports(response.data.reports);
      } else {
        console.error("Failed to fetch reports:", response.error);
      }
    } catch (error) {
      console.error("An error occurred while fetching reports:", error);
    }
  };

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
        setSuccessMessage("Report created and saved successfully!");
        fetchReports(token);
      } else {
        setErrorMessage(response.error || "Failed to create report.");
      }
    } catch (error) {
      setErrorMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchReports(token);
    }
  }, []);

  return (
    <div className="admin-reports">
      <h1>Reports</h1>
      <div className="admin-reports-container">
        <div className="generate-report">
          <div className="generate-report-text">
            <h3>Generate Report</h3>
            <p>Click the button to generate a new report.</p>
          </div>
          <button
            onClick={handleCreateReport}
            disabled={loading}
            className="generate-report-button"
          >
            {loading ? "Generating..." : "Create Report"}
          </button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h3>Uploaded Reports</h3>
        <ul className="reports-list">
          {reports
            .slice()
            .reverse()
            .map((report) => (
              <li key={report._id} className="report-item">
                <a
                  href={`${import.meta.env.VITE_API_URL}/uploads/${
                    report.filename
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {report.filename}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminReports;
