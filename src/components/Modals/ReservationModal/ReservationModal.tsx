import "../Modals.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
        <h2>Make a Reservation</h2>
        <p>This will be the field for making a reservation.</p>
      </div>
    </div>
  );
};

export default ReservationModal;
