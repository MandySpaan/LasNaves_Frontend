import { useEffect, useState } from "react";
import {
  createReport,
  getAllReports,
} from "../../../api/administrationApiCalls";

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
        setSuccessMessage("Report created and uploaded successfully!");
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
    <div>
      <h2>Generate Daily Report</h2>
      <button onClick={handleCreateReport} disabled={loading}>
        {loading ? "Generating..." : "Create Report"}
      </button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <h3>Uploaded Reports</h3>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
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
  );
};

export default AdminReports;
