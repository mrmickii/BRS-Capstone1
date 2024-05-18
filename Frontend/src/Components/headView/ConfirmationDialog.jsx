import React from "react";
import "../../CSS/headCSS/confirmation-dialog.css";

const ConfirmationDialog = ({ action, onConfirm, onCancel }) => {
  const getMessage = () => {
    if (action === 'approve') {
      return 'Are you sure you want to approve this reservation?';
    } else if (action === 'reject') {
      return 'Are you sure you want to reject this reservation?';
    }
    return '';
  };

  return (
    <div className="confirmation-modal">
      <span className="modal-close-span">
        <p className="modal-close-btn" onClick={onCancel}>x</p>
      </span>
      <p>{getMessage()}</p>
      <div className="modal-btn">
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
