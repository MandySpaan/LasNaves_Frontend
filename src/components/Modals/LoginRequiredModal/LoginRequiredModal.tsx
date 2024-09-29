import { Link } from "react-router-dom";
import "../Modals.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRequiredModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-x" onClick={onClose}>
          &times;
        </button>
        <h2>Login Required</h2>
        <p>
          You need to be logged in for this. <br />
          Please log in first.
        </p>
        <Link to="/login" className="modal-link">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
