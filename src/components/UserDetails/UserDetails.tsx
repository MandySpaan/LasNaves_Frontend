import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/userApiCalls";
import EditMyUserDetailsModal from "../Modals/EditMyUserDetailsModal/EditMyUserDetailsModal";
import "./UserDetails.css";
import ChangePasswordModal from "../Modals/ChangePasswordModal/ChangePasswordModal";

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMyUserDetailsModalOpen, setIsEditMyUserDetailsModalOpen] =
    useState<boolean>(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);

  const token = localStorage.getItem("token");

  const retrieveUserDetails = async () => {
    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const userDataResult = await getUserDetails(token!);
      const userData = userDataResult.data.user;
      setUser(userData);
    } catch (err) {
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveUserDetails();
  }, []);

  const handleEditMyUserDetails = () => {
    setIsEditMyUserDetailsModalOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordModalOpen(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {user.name} {user.surname}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      {user.startUp && (
        <p>
          <strong>Start-up:</strong> {user.startUp}
        </p>
      )}
      <p>
        <strong>DNI:</strong> {user?.dni}
      </p>
      {user?.phone && (
        <p>
          <strong>Phone:</strong> {user?.phone}
        </p>
      )}
      <div className="user-actions">
        <button
          className="general-btn userdetails-btn"
          onClick={handleEditMyUserDetails}
        >
          Edit My User Details
        </button>
        <button
          className="general-btn userdetails-btn"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
      <EditMyUserDetailsModal
        isOpen={isEditMyUserDetailsModalOpen}
        onClose={() => setIsEditMyUserDetailsModalOpen(false)}
        user={user}
        onUpdate={() => retrieveUserDetails()}
      />
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};

export default UserDetails;
