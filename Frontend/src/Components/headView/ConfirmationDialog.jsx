import React from "react";
import "../../CSS/headCSS/confirmation-dialog.css"

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <p onClick={onCancel}>x</p>
      <p>Are you sure you want to approve this reservation?</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConfirmationDialog;
