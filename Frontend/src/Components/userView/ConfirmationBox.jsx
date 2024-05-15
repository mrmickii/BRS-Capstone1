import React from 'react';

const ConfirmationBox = ({ onCancel, onConfirm }) => {
  return (
    <div className="confirmation-box">
      <p>Are you sure of submitting this request?</p>
      <div className="button-container">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmationBox;
