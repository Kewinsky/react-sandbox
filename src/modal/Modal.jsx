import { useState } from "react";
import "./Modal.css";

const Modal = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <button onClick={() => setIsShown(!isShown)}>Show modal</button>
      {isShown && <Popup isShown={isShown} onClose={() => setIsShown(false)} />}
    </div>
  );
};

const Popup = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-heading">
          <h2>Modal Title</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <p>This is a simple modal.</p>
      </div>
    </div>
  );
};

export default Modal;
