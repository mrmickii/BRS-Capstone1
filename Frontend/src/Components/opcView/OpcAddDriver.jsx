import React, { useState } from 'react';
import '../../CSS/opcCSS/opc-add-driver.css';

const AddDriver = ({ onClose }) => {
  const [driverName, setDriverName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  const handleAddDriver = async () => {
    try {
      if (!driverName || !contactNumber) {
        setErrorMessage('Please input all fields');
        setTimeout(() => setErrorMessage(''), 4000);
        return;
      }

    // Validation for driver name (should not contain integers)
    const driverNameRegex = /^[^\d]+$/;
    if (!driverNameRegex.test(driverName)) {
      setErrorMessage('Driver name should not contain integers.');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

      // Validation for contact number
      const contactNumberRegex = /^(09)\d{9}$/;
      if (!contactNumberRegex.test(contactNumber)) {
        setErrorMessage('Contact number should start with 09 and have 11 digits.');
        setTimeout(() => setErrorMessage(''), 4000);
        return;
      }

      const response = await fetch('http://localhost:8080/driver/post', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverName,
          contactNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add driver');
      }
      
      setSuccessMessage('Driver added successfully!');
      setDriverName('');
      setContactNumber('');
    } catch (error) {
      setErrorMessage('Error adding driver: ' + error.message);
      setTimeout(() => setErrorMessage(''), 4000);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <h3>Add New Driver:</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="dialog-content">
          <input
            type="text"
            placeholder="Driver's Name"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />

        </div>
        <div className="dialog-footer">
          <div className="message-column">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="button-column">
            <button onClick={handleAddDriver}>Add</button>
          </div>
          <div className="button-column">
            <button onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDriver;
