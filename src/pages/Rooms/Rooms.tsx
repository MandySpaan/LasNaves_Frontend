import { useEffect, useState } from "react";
import { getAllRooms, getCurrentOccupancy } from "../../api/roomApiCalls";
import { getOwnCurrentAccess } from "../../api/userApiCalls";
import { checkin, checkout } from "../../api/accessApicalls";
import LoginRequiredModal from "../../components/Modals/LoginRequiredModal/LoginRequiredModal";
import ReservationModal from "../../components/Modals/ReservationModal/ReservationModal";
import ErrorModal from "../../components/Modals/ErrorModal/ErrorModal";
import "./Rooms.css";

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [checkedInRoomId, setCheckedInRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomsId] = useState<string | null>(null);

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

  const getUsersCurrentAccess = async () => {
    if (token) {
      const userCurrentAccess = await getOwnCurrentAccess(token);
      if (userCurrentAccess.data.ownCurrentAccess) {
        const ownCurrentAccess = userCurrentAccess.data.ownCurrentAccess;
        const roomId = ownCurrentAccess.roomId;
        return setCheckedInRoomId(roomId);
      }
    }
  };

  useEffect(() => {
    fetchRooms();
    getUsersCurrentAccess();
  }, []);

  const handleCheckIn = async (token: string, roomId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await checkin(token, roomId);

      if (response.success === true) {
        setCheckedInRoomId(roomId);
        fetchRooms();
      } else {
        setIsErrorModalOpen(true);
        setError(response.error || "Check-in failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during check-in:", err);
      setError("An error occurred during check-in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (token: string, roomId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await checkout(token, roomId);

      if (response.success === true) {
        setCheckedInRoomId(null);
        fetchRooms();
      } else {
        setError(response.error || "Check-out failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during check-out:", err);
      setError("An error occurred during check-out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInClick = (roomId: string) => {
    if (token) {
      handleCheckIn(token, roomId);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleMakeReservationClick = (roomId: string) => {
    if (token) {
      setSelectedRoomsId(roomId);
      setIsReservationModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="rooms-page">
      {loading && <p className="loading">Loading...</p>}
      <div className="room-list">
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
                className="general-btn"
                onClick={() => handleMakeReservationClick(room._id)}
              >
                Make Reservation
              </button>
              {!checkedInRoomId ? (
                <button
                  className="general-btn checkin-btn"
                  onClick={() => handleCheckInClick(room._id)}
                  disabled={loading}
                >
                  Check In
                </button>
              ) : null}
              {checkedInRoomId === room._id && (
                <button
                  className="general-btn checkout-btn"
                  onClick={() => handleCheckOut(token!, room._id)}
                  disabled={loading}
                >
                  Check Out
                </button>
              )}
            </div>
          </div>
        ))}
        <LoginRequiredModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
          token={token!}
          roomId={selectedRoomId!}
        />
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          error={error!}
        />
      </div>
    </div>
  );
};

export default Rooms;
