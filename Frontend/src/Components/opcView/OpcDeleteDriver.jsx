import React from 'react';
import '../../CSS/opcCSS/opc-delete-driver.css';

const DeleteDriver = ({ onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete();
      alert('Driver successfully deleted.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting driver:', error);
      alert('Failed to delete driver. Please try again.');
    }
  };

  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-box">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this driver?</p>
        <div className="delete-confirmation-buttons">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDriver;
