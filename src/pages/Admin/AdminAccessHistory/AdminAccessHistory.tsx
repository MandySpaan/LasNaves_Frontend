import { useState } from "react";
import AllAccessHistoryModal from "../../../components/Modals/Admin/AllAccessHistoryModal/AllAccessHistoryModal";
import RoomAccessHistoryModal from "../../../components/Modals/Admin/RoomAccessHistoryModal/RoomAccessHistoryModal";
import UserAccessHistoryModal from "../../../components/Modals/Admin/UserAccessHistoryModal/UserAccessHistoryModal";
import "./AdminAccessHistory.css";

const AdminAccessHistory: React.FC = () => {
  const [isAllHistoryModalOpen, setAllHistoryModalOpen] = useState(false);
  const [isRoomHistoryModalOpen, setRoomHistoryModalOpen] = useState(false);
  const [isUserHistoryModalOpen, setUserHistoryModalOpen] = useState(false);

  const handleAllHistoryClick = () => {
    setAllHistoryModalOpen(true);
  };

  const handleRoomHistoryClick = () => {
    setRoomHistoryModalOpen(true);
  };

  const handleUserHistoryClick = () => {
    setUserHistoryModalOpen(true);
  };

  const closeAllHistoryModal = () => {
    setAllHistoryModalOpen(false);
  };

  const closeRoomHistoryModal = () => {
    setRoomHistoryModalOpen(false);
  };

  const closeUserHistoryModal = () => {
    setUserHistoryModalOpen(false);
  };

  return (
    <div className="admin-access-history">
      <h1>Access History</h1>
      <div className="options-container">
        <div className="option-box" onClick={handleAllHistoryClick}>
          <h2>All Access History</h2>
          <p>
            Click here to retrieve the complete <br />
            access history over a time frame.
          </p>
        </div>
        <div className="option-box" onClick={handleRoomHistoryClick}>
          <h2>Room Access History</h2>
          <p>
            Click here to retrieve access history <br /> for a specific room
            over a time frame.
          </p>
        </div>
        <div className="option-box" onClick={handleUserHistoryClick}>
          <h2>User Access History</h2>
          <p>
            Click here to retrieve access history <br /> for a specific user
            over a time frame.
          </p>
        </div>
      </div>
      <AllAccessHistoryModal
        isOpen={isAllHistoryModalOpen}
        onClose={closeAllHistoryModal}
      />
      <RoomAccessHistoryModal
        isOpen={isRoomHistoryModalOpen}
        onClose={closeRoomHistoryModal}
      />
      <UserAccessHistoryModal
        isOpen={isUserHistoryModalOpen}
        onClose={closeUserHistoryModal}
      />
    </div>
  );
};

export default AdminAccessHistory;
