import { useEffect, useState } from "react";
import { getOwnCurrentAccess } from "../../api/userApiCalls";
import "./UserStatus.css";

const token = localStorage.getItem("token");

const UserStatus: React.FC = () => {
  const [accessData, setAccessData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  useEffect(() => {
    const retrieveAccessData = async () => {
      try {
        const response = await getOwnCurrentAccess(token!);
        setAccessData(response.data);
      } catch (err) {
        setError("Failed to fetch access data");
      } finally {
        setLoading(false);
      }
    };

    retrieveAccessData();
  }, []);

  const handleCheckout = async () => {
    // Implement the checkout functionality here
    console.log("Checkout button clicked");
    setCheckoutMessage("Checking out...");
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
            {new Date(
              accessData.ownCurrentAccess.entryDateTime
            ).toLocaleString()}
          </p>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      ) : (
        <p>You are currently not checked in anywhere.</p>
      )}
      {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}
    </div>
  );
};

export default UserStatus;
