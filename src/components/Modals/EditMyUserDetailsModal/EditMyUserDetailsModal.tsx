import { useEffect, useState } from "react";
import {
  updateOwnUserDetails,
  editOwnUserDetailsPayload,
} from "../../../api/userApiCalls";
import "./EditMyUserDetailsModal.css";
import "../Modals.css";

interface EditMyUserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: editOwnUserDetailsPayload;
  onUpdate: () => void;
}

const EditMyUserDetailsModal: React.FC<EditMyUserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
}) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [startUp, setStartUp] = useState(user.startUp || "");
  const [dni, setDni] = useState(user.dni);
  const [phone, setPhone] = useState(user.phone || "");

  const token = localStorage.getItem("token");

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname);
    setStartUp(user.startUp || "");
    setDni(user.dni);
    setPhone(user.phone || "");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: editOwnUserDetailsPayload = {
      name,
      surname,
      startUp,
      dni,
      phone,
    };

    try {
      await updateOwnUserDetails(token!, payload);
      alert("User details updated successfully");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update user details");
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>
        <h2>Edit User Details</h2>
        <form onSubmit={handleSubmit} className="edit-user-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startUp">StartUp (Optional)</label>
            <input
              type="text"
              id="startUp"
              value={startUp}
              onChange={(e) => setStartUp(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dni">DNI</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMyUserDetailsModal;
