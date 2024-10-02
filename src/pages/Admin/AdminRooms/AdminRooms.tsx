import { useEffect, useState } from "react";
import "./AdminRooms.css";
import { getAllRooms, getCurrentOccupancy } from "../../../api/roomApiCalls";

interface Room {
  _id: string;
  roomName: string;
  roomType: string;
  capacity: number;
  occupancy: number;
  reserved: number;
  placesAvailable: number;
}

const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <p>Loading rooms...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-rooms">
      <h1>Rooms</h1>
      <table className="rooms-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Capacity</th>
            <th>Occupancy</th>
            <th>Reserved</th>
            <th>Places Available</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.roomName}</td>
              <td>{room.roomType}</td>
              <td>{room.capacity}</td>
              <td>{room.occupancy}</td>
              <td>{room.reserved}</td>
              <td>{room.placesAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRooms;
