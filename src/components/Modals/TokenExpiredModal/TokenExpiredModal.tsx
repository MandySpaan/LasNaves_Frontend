import "../Modals.css";
import "./TokenExpiredModal.css";

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const TokenExpiredModal: React.FC<ModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>
          Your session has expired. Please login again or go back to the home
          page.
        </p>
        <div className="tokenexpired-buttons">
          <button className="general-btn" onClick={onConfirm}>
            Login
          </button>
          <button className="general-btn" onClick={onCancel}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
