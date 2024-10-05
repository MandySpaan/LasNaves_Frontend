import { useEffect, useState } from "react";
import { getOwnCurrentAccess } from "../../api/userApiCalls";
import { checkout } from "../../api/accessApicalls";
import "./UserStatus.css";
import { formatDateTime } from "../../utils/dateUtils";

const UserStatus: React.FC = () => {
  const [accessData, setAccessData] = useState<any>(null);
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const retrieveAccessData = async () => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }
    try {
      const response = await getOwnCurrentAccess(token!);
      setAccessData(response.data);
      setRoomId(response.data.ownCurrentAccess.roomId);
    } catch (err) {
      setError("Failed to fetch access data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveAccessData();
  }, []);

  const handleCheckOut = async (token: string, roomId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await checkout(token, roomId);

      if (response.success === true) {
        retrieveAccessData();
      }
    } catch (err) {
      console.error("Error during check-out:", err);
      setError("An error occurred during check-out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-status">
      <h2>Current Access</h2>
      {accessData?.ownCurrentAccess?.roomName ? (
        <div className="access-details">
          <p>
            <strong>You are checked in:</strong>{" "}
            {accessData.ownCurrentAccess.roomName}
          </p>
          <p>
            <strong>Entry Date and Time:</strong>{" "}
            {formatDateTime(accessData.ownCurrentAccess.entryDateTime)}
          </p>
          <button
            className="general-btn checkout-btn"
            onClick={() => handleCheckOut(token!, roomId)}
          >
            Checkout
          </button>
        </div>
      ) : (
        <p>You are currently not checked in anywhere.</p>
      )}
    </div>
  );
};

export default UserStatus;
