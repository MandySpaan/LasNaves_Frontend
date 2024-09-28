import { useEffect, useState } from "react";
import { getAllRooms, getCurrentOccupancy } from "../../api/roomApiCalls";
import "./Rooms.css";
import { checkin } from "../../api/accessApicalls";

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getAllRooms();
      const roomData = response.data.rooms || [];

      const roomsWithOccupancy = await Promise.all(
        roomData.map(async (room: any) => {
          const occupancyResponse = await getCurrentOccupancy(room._id);
          const occupancyData = occupancyResponse.data.roomOccupancy;
          return {
            ...room,
            occupancy: occupancyData.currentOccupancy,
            reserved: occupancyData.currentReserved,
            placesAvailable: occupancyData.placesAvailable,
          };
        })
      );
      setRooms(roomsWithOccupancy);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCheckIn = async (token: string, roomId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await checkin(token, roomId);

      if (response.success === true) {
        console.log(`Check-in successful for room ID: ${roomId}`);
        fetchRooms();
      } else {
        console.error(`Check-in failed for room ID: ${roomId}`);
        setError("Check-in failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during check-in:", err);
      setError("An error occurred during check-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeReservation = (roomId: string) => {
    console.log(`Make Reservation button clicked for room ID: ${roomId}`);
  };

  return (
    <div className="room-list">
      {loading && <p>Loading rooms...</p>}
      {error && <p className="error">{error}</p>}
      {rooms.map((room) => (
        <div className="room-box user-status" key={room._id}>
          <h2>{room.roomName}</h2>
          <p>
            <strong>Room Type:</strong> {room.roomType}
          </p>
          <p>
            <strong>Capacity:</strong> {room.capacity}
          </p>
          <p>
            <strong>Occupancy:</strong> {room.occupancy}
          </p>
          <p>
            <strong>Reserved:</strong> {room.reserved}
          </p>
          <p>
            <strong>Places Available:</strong> {room.placesAvailable}
          </p>
          <div className="access-details">
            <button
              className="checkout-btn"
              onClick={() => {
                if (token) {
                  handleCheckIn(token, room._id);
                } else {
                  setError("You need to be logged in to check in.");
                  // Redirect to login page
                }
              }}
              disabled={loading}
            >
              Check In
            </button>
            <button
              className="checkout-btn"
              onClick={() => handleMakeReservation(room._id)}
            >
              Make Reservation
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rooms;
