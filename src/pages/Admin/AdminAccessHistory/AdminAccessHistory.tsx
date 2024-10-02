import { useState } from "react";
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

      {/* Placeholders for future modals */}
      {isAllHistoryModalOpen && (
        <div className="modal">
          <div>
            <p>AllHistory model to be added</p>
            <button onClick={closeAllHistoryModal}>Close</button>
          </div>
        </div>
      )}

      {isRoomHistoryModalOpen && (
        <div className="modal">
          <div>
            <p>RoomHistory model to be added</p>
            <button onClick={closeRoomHistoryModal}>Close</button>
          </div>
        </div>
      )}

      {isUserHistoryModalOpen && (
        <div className="modal">
          <p>TimeFrameModal to be added</p>
          <button onClick={closeUserHistoryModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminAccessHistory;
