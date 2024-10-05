import { useEffect, useState } from "react";
import { getOwnReservations } from "../../api/userApiCalls";
import { useNavigate } from "react-router-dom";
import "./UserReservations.css";
import { formatDateTime } from "../../utils/dateUtils";

const UserReservations: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveReservations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }
      try {
        const response = await getOwnReservations(token!);
        setReservations(response.data.reservations || []);
      } catch (err) {
        setError("Failed to fetch reservations");
      } finally {
        setLoading(false);
      }
    };

    retrieveReservations();
  }, []);

  const handleMakeReservation = () => {
    navigate("/rooms");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-reservations">
      <h2>My Reservations</h2>
      {reservations.length > 0 ? (
        <div className="reservations-list">
          {reservations.map((reservation, index) => (
            <div key={index} className="reservation-item">
              <p>
                <strong>Room Name:</strong> {reservation.roomName}
              </p>
              <p>
                <strong>Entry Date and Time:</strong>{" "}
                {formatDateTime(reservation.entryDateTime)}
              </p>
              <p>
                <strong>Exit Date and Time:</strong>{" "}
                {formatDateTime(reservation.exitDateTime)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations found.</p>
      )}
      <button className="general-btn" onClick={handleMakeReservation}>
        Make Reservation
      </button>
    </div>
  );
};

export default UserReservations;
