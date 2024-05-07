import React from 'react';
import '../../CSS/opcCSS/modal.css';

function RejectModal({ onClose }) {

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );

  return (
    <div className="rejectmodalBackground">
      <div className="rejectmodalContainer">
        <div className="rejecttitle">
          <h2>Are you sure to reject the request?</h2>
          </div>
          <div className="reject-modal-button">
          <button  className="reject-modal-cancel-button" type="button" onClick={onClose}>CANCEL</button>
          <button className="reject-modal-save-button" type="submit">SAVE CHANGES</button>
          </div>
      </div>
    </div>
  );
}

export default RejectModal;
