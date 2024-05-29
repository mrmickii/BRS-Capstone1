import React, { useState } from "react";
import "../../CSS/headCSS/confirmation-dialog.css";

const ConfirmationDialog = ({ action, onConfirm, onCancel, onFeedbackChange, feedback }) => {
  const [error, setError] = useState("");

  const getMessage = () => {
    if (action === 'approve') {
      return 'Are you sure you want to approve this reservation?';
    } else if (action === 'reject') {
      return 'Are you sure you want to reject this reservation?';
    }
    return '';
  };

  const handleFeedbackChange = (e) => {
    onFeedbackChange(e.target.value);
    setError("");
  };

  const handleConfirm = () => {
    if (action === "reject" && feedback.trim() === "") {
      setError("Feedback is required when rejecting a reservation.");
      return;
    }
    if (action === "approve") {
      alert("Request has been Approved successfully!");
    } else if (action === "reject") {
      alert("Request has been Rejected");
    }
    onConfirm();
  };

  return (
    <div className="overlay">
      <div className="confirmation-modal">
        <span className="modal-close-span">
          <p className="modal-close-btn" onClick={onCancel}>x</p>
        </span>
        <p>{getMessage()}</p>
        {action === "reject" && (
          <div>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter feedback"
            />
            <p className="error-message">{error}</p>
          </div>
        )}
        <div className="modal-btn">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
