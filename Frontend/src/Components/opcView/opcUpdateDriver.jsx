import React, { useState } from 'react';
import '../../CSS/opcCSS/opc-update-driver.css';

const UpdateDriver = ({ driver, onUpdate, onClose }) => {
  const [updatedDriverName, setUpdatedDriverName] = useState(driver.driverName);
  const [updatedContactNumber, setUpdatedContactNumber] = useState(driver.contactNumber);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateDriver = async () => {
    try {
      const response = await fetch(`http://localhost:8080/driver/update/${driver.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverName: updatedDriverName,
          contactNumber: updatedContactNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update driver');
      }

      onUpdate({
        driverName: updatedDriverName,
        contactNumber: updatedContactNumber,
      });

      setSuccessMessage('Driver information updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating driver:', error);
      setErrorMessage('Error updating driver: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  return (
    <div className="update-dialog-overlay">
      <div className="update-dialog-box">
        <div className="dialog-header">
          <h3>Update Driver Information</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <input
          type="text"
          value={updatedDriverName}
          onChange={(e) => setUpdatedDriverName(e.target.value)}
          placeholder="Driver Name"
        />
        <input
          type="text"
          value={updatedContactNumber}
          onChange={(e) => setUpdatedContactNumber(e.target.value)}
          placeholder="Contact Number"
        />
        <div className="update-dialog-buttons">
          <button onClick={handleUpdateDriver}>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateDriver;
