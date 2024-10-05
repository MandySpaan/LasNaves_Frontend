import { useState } from "react";
import { cancelReservation } from "../../../api/accessApicalls";
import "../Modals.css";
import "./CancelReservationModal.css";
import { formatDateTime, formatTime } from "../../../utils/dateUtils";

interface Reservation {
  accessId: string;
  roomName: string;
  entryDateTime: string;
  exitDateTime: string;
}

interface CancelReservationProps {
  reservations: Reservation[];
  onClose: () => void;
}

const CancelReservationModal: React.FC<CancelReservationProps> = ({
  reservations,
  onClose,
}) => {
  const [selectedReservation, setSelectedReservation] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    if (!selectedReservation) {
      setError("Please select a reservation to cancel");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    setLoading(true);
    try {
      const response = await cancelReservation(token, selectedReservation);
      if (response.success) {
        setError(null);
        setSuccessMessage("Reservation canceled successfully");
      } else {
        setError("Failed to cancel reservation");
      }
    } catch (err) {
      setError("Failed to cancel reservation");
    } finally {
      setLoading(false);
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay cancel-reservation" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>
        <h3>Cancel Reservation</h3>
        {!successMessage && (
          <div className="select-and-button">
            <select
              id="reservation-select"
              value={selectedReservation || ""}
              onChange={(e) => setSelectedReservation(e.target.value)}
            >
              <option value="" disabled>
                Select a reservation
              </option>
              {reservations.map((reservation) => (
                <option key={reservation.accessId} value={reservation.accessId}>
                  {`${reservation.roomName} - ${formatDateTime(
                    reservation.entryDateTime
                  )} to ${formatTime(reservation.exitDateTime)}`}
                </option>
              ))}
            </select>
            {error && <p className="error-message">{error}</p>}

            <button
              className="general-btn checkout-btn"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? "Cancelling..." : "Cancel Reservation"}
            </button>
          </div>
        )}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
};

export default CancelReservationModal;
