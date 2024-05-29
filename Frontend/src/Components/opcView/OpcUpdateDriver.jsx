import React, { useState, useEffect } from 'react';
import '../../CSS/opcCSS/opc-update-driver.css';

const UpdateDriver = ({ driver, onUpdate, onClose }) => {
  const [updatedDriverName, setUpdatedDriverName] = useState(driver.driverName);
  const [updatedContactNumber, setUpdatedContactNumber] = useState(driver.contactNumber);
  const [updatedStatus, setUpdatedStatus] = useState(driver.status); // Corrected state initialization
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear success message after 3 seconds
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleUpdateDriver = async () => {
    // Check if any field has been updated
    if (
      updatedDriverName === driver.driverName &&
      updatedContactNumber === driver.contactNumber &&
      updatedStatus === driver.status
    ) {
      setErrorMessage('No changes detected. Please update at least one field.');
      setSuccessMessage('');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/driver/update/${driver.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverName: updatedDriverName,
          contactNumber: updatedContactNumber,
          status: updatedStatus
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update driver');
      }

      onUpdate({
        driverName: updatedDriverName,
        contactNumber: updatedContactNumber,
        status: updatedStatus
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
          <h1>Update Driver Information</h1>
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
          <button onClick={handleUpdateDriver} 
          style={{
            backgroundColor: "#782324", 
            width: "150px",
            position: "absolute",
            left: "1090px"
            }}>
            Update
            </button>
          <button onClick={handleClose}
           style={{
            width: "150px",
            position: "absolute",
            left: "920px"
            }}
          >Cancel</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateDriver;
