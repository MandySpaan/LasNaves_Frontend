import { useState, useEffect } from "react";
import { getRoomAccessHistoryByDate } from "../../../../api/accessHistoryApiCalls";
import { getAllRooms } from "../../../../api/roomApiCalls";
import "../../Modals.css";
import "./RoomAccessHistoryModal.css";

interface RoomAccessHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoomAccessHistoryModal: React.FC<RoomAccessHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [accessHistory, setAccessHistory] = useState<any[]>([]);
  const [rooms, setRooms] = useState<{ roomName: string; _id: string }[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await getAllRooms();
        if (response.success) {
          setRooms(response.data.rooms);
        } else {
          setError(response.error || "Failed to retrieve rooms.");
        }
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("An error occurred while fetching the rooms.");
      }
    };

    fetchRooms();
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
      const response = await getRoomAccessHistoryByDate(
        token,
        selectedRoomId,
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
        <h2>Room Access History</h2>
        {!showHistory ? (
          <form onSubmit={handleFetchHistory}>
            <div className="input-group">
              <label htmlFor="roomSelect">Select Room:</label>
              <select
                id="roomSelect"
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                required
              >
                <option value="">--Select a Room--</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.roomName}
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
              {startDate} to {endDate}
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
                      <strong>Entry:</strong>{" "}
                      {new Date(access.entryDateTime).toLocaleDateString()}{" "}
                      {new Date(access.entryDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      <strong>Exit:</strong>{" "}
                      {new Date(access.exitDateTime).toLocaleDateString()}{" "}
                      {new Date(access.exitDateTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      <br />
                      <strong>User:</strong> {access.userId.name}{" "}
                      {access.userId.surname} <br />
                      <strong>Room:</strong> {access.roomId.roomName} <br />
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

export default RoomAccessHistoryModal;
