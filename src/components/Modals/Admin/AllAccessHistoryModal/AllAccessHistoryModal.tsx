import { useState } from "react";
import { getAllAccessHistoryByDate } from "../../../../api/accessHistoryApiCalls";
import { formatDate, formatTime } from "../../../../utils/dateUtils";
import "../../Modals.css";
import "./AllAccessHistoryModal.css";

interface AllAccessHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllAccessHistoryModal: React.FC<AllAccessHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [accessHistory, setAccessHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowHistory(false);
      onClose();
    }
  };

  const handleFetchHistory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No valid token found.");
      setLoading(false);
      return;
    }

    try {
      const response = await getAllAccessHistoryByDate(
        token,
        startDate,
        endDate
      );
      if (response.success) {
        setAccessHistory(response.data.accessHistory);
        setShowHistory(true);
      } else {
        setError(response.error || "Failed to retrieve access history.");
      }
    } catch (err) {
      console.error("Error fetching access history:", err);
      setError("An error occurred while fetching the access history.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button
          className="modal-close-x"
          onClick={() => {
            setShowHistory(false);
            onClose();
          }}
        >
          &times;
        </button>
        <h2>Access History</h2>
        {!showHistory ? (
          <form onSubmit={handleFetchHistory}>
            <div className="input-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={loading}
            >
              {loading ? "Loading..." : "Retrieve History"}
            </button>
          </form>
        ) : (
          <div>
            <h3>
              Access history for all rooms and all users <br />
              from {formatDate(startDate)} to {formatDate(endDate)}
            </h3>
            <div className="history-results">
              <ul>
                {accessHistory
                  .sort(
                    (a, b) =>
                      new Date(a.entryDateTime).getTime() -
                      new Date(b.entryDateTime).getTime()
                  )
                  .map((access) => (
                    <li key={access._id}>
                      <strong>Date: </strong>
                      {formatDate(access.entryDateTime)}
                      <br />
                      <strong>Time:</strong> {formatTime(access.entryDateTime)}{" "}
                      - {formatTime(access.exitDateTime)}
                      <br />
                      <strong>User:</strong> {access.userId.name}{" "}
                      {access.userId.surname} <br />
                      <strong>Room:</strong> {access.roomId.roomName} <br />
                      <strong>Status:</strong> {access.status} <br />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default AllAccessHistoryModal;
