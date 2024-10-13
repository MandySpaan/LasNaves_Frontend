import { useEffect, useState } from "react";
import {
  getAllRooms,
  getCurrentOccupancy,
  getOccupancyUsersList,
} from "../../../api/roomApiCalls";
import "./AdminRooms.css";
import { formatDateTime } from "../../../utils/dateUtils";

interface Room {
  _id: string;
  roomName: string;
  roomType: string;
  capacity: number;
  occupancy: number;
  reserved: number;
  placesAvailable: number;
  usersPresent: {
    status: string;
    userName: string;
    accessDateTime: string;
    exitDateTime?: string;
  }[];
}

const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getAllRooms();
      const roomData = response.data.rooms || [];

      const roomsWithDetails = await Promise.all(
        roomData.map(async (room: any) => {
          const occupancyResponse = await getCurrentOccupancy(room._id);
          const occupancyData = occupancyResponse.data.roomOccupancy;

          const usersResponse = await getOccupancyUsersList(token!, room._id);
          let usersPresent: any[] = [];

          if (usersResponse.success) {
            const usersData = usersResponse.data.roomStatus.access || [];

            usersPresent = usersData.map((user: any) => ({
              status: user.status,
              userName: user.userName,
              accessDateTime: user.accessDateTime,
              exitDateTime: user.exitDateTime || null,
            }));
          }

          return {
            ...room,
            occupancy: occupancyData.currentOccupancy || 0,
            reserved: occupancyData.currentReserved || 0,
            placesAvailable: occupancyData.placesAvailable || 0,
            usersPresent: usersPresent || [],
          };
        })
      );
      setRooms(roomsWithDetails);
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
            <th>Users Present</th>
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
              <td className="places-available">{room.placesAvailable}</td>
              <td className="users-present">
                {room.occupancy === 0 &&
                room.reserved === 0 &&
                room.usersPresent.length === 0 ? (
                  <p> No users currently present nor reserved</p>
                ) : (
                  <ul>
                    {room.usersPresent.map((user, index) => (
                      <li key={index}>
                        <strong>User:</strong> {user.userName}{" "}
                        {`(${user.status})`}
                        <br />
                        <strong>Access Time:</strong>{" "}
                        {formatDateTime(user.accessDateTime)}
                        <br />
                        {user.exitDateTime && (
                          <>
                            <strong>Exit Time:</strong>{" "}
                            {formatDateTime(user.exitDateTime)}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRooms;
