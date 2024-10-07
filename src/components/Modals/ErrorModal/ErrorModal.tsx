import "../Modals.css";
import "./ErrorModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

const ErrorModal: React.FC<ModalProps> = ({ isOpen, onClose, error }) => {
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
        <h2>Oops</h2>
        <p className="errormodal-error">{error}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
