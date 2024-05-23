
import React from 'react';
import '../../CSS/userCSS/alert-modal.css';

const AlertModal = ({ isOpen, message, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AlertModal;
