import { useState, useEffect } from "react";
import { getAllUsers } from "../../../../api/userApiCalls";
import { getUserAccessHistoryByDate } from "../../../../api/accessHistoryApiCalls";
import { formatDate, formatTime } from "../../../../utils/dateUtils";
import "../../Modals.css";
import "./UserAccessHistoryModal.css";

interface UserAccessHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserAccessHistoryModal: React.FC<UserAccessHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [accessHistory, setAccessHistory] = useState<any[]>([]);
  const [users, setUsers] = useState<
    { name: string; surname: string; _id: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await getAllUsers(token);
        if (response.success) {
          setUsers(response.data.users);
        } else {
          setError(response.error || "Failed to retrieve users.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An error occurred while fetching the users.");
      }
    };

    fetchUsers();
  }, []);

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
      const response = await getUserAccessHistoryByDate(
        token,
        selectedUserId,
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

  const getSelectedUserName = () => {
    const selectedUser = users.find((user) => user._id === selectedUserId);
    return selectedUser ? `${selectedUser.name} ${selectedUser.surname}` : "";
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
        <h2>User Access History</h2>
        {!showHistory ? (
          <form onSubmit={handleFetchHistory}>
            <div className="input-group">
              <label htmlFor="userSelect">Select User:</label>
              <select
                id="userSelect"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                required
              >
                <option value="">--Select a User--</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>
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
              Access history for the user {getSelectedUserName()}
              <br />
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
                      <strong>Room:</strong> {access.roomName} <br />
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

export default UserAccessHistoryModal;
