import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservation } from "../../../api/accessApicalls";
import "./ReservationModal.css";
import "../Modals.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  token: string;
}

const ReservationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  token,
  roomId,
}) => {
  const [entryDate, setEntryDate] = useState<string>("");
  const [entryTime, setEntryTime] = useState<string>("09:00");
  const [exitTime, setExitTime] = useState<string>("10:00");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleReserve = async () => {
    if (!entryDate || !entryTime || !exitTime) {
      setError("Please fill in all fields");
      return;
    }

    const entryDateTime = new Date(`${entryDate}T${entryTime}:00Z`);
    const exitDateTime = new Date(`${entryDate}T${exitTime}:00Z`);

    if (entryDateTime >= exitDateTime) {
      setError("Exit time must be later than entry time.");
      return;
    }

    try {
      const response = await reservation(
        token,
        roomId,
        entryDateTime,
        exitDateTime
      );
      if (!response.success) {
        setError("Failed to reserve place");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      setError("Failed to reserve place");
    }
  };

  const renderTimeOptions = (start: number, end: number) => {
    const options = [];
    for (let hour = start; hour <= end; hour++) {
      const hourString = hour.toString().padStart(2, "0");
      options.push(
        <option key={hour} value={`${hourString}:00`}>
          {hourString}:00
        </option>
      );
    }
    return options;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>
        <h2>Make a Reservation</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReserve();
          }}
        >
          <div>
            <label htmlFor="entryDate">Entry Date:</label>
            <input
              type="date"
              id="entryDate"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="entryTime">Entry Time:</label>
            <select
              id="entryTime"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
            >
              {renderTimeOptions(9, 17)}
            </select>
          </div>

          <div>
            <label htmlFor="exitTime">Exit Time:</label>
            <select
              id="exitTime"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
            >
              {renderTimeOptions(10, 18)}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Reserve</button>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
