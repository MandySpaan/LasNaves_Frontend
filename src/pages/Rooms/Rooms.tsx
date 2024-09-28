import { useEffect, useState } from "react";
import { getAllRooms } from "../../api/roomApiCalls";
import "./Rooms.css";

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  const fetchRooms = async () => {
    const response = await getAllRooms();
    const roomData = response.data.rooms || [];

    const roomsWithOccupancy = roomData.map((room: any) => ({
      ...room,
      occupancy: 0,
      placesAvailable: room.capacity,
    }));
    setRooms(roomsWithOccupancy);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCheckIn = (roomId: number) => {
    console.log(`Check In button clicked for room ID: ${roomId}`);
  };

  const handleMakeReservation = (roomId: number) => {
    console.log(`Make Reservation button clicked for room ID: ${roomId}`);
  };

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <div className="room-box user-status" key={room.id}>
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
            <strong>Places Available:</strong> {room.placesAvailable}
          </p>
          <div className="access-details">
            <button
              className="checkout-btn"
              onClick={() => handleCheckIn(room.id)}
            >
              Check In
            </button>
            <button
              className="checkout-btn"
              onClick={() => handleMakeReservation(room.id)}
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
