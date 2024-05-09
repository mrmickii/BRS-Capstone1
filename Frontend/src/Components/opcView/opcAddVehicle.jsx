import React, { useState } from 'react';
import '../../CSS/opcCSS/opc-add-vehicle.css';

const AddVehicle = ({ onClose }) => {
  const [name, setName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClose = () => {
    onClose();
    window.location.reload();
  };

  const handleCancel = () => {
    onClose();
    window.location.reload();
  };

  const handleAddVehicle = async () => {
    try {
      if (!name || !plateNumber || !capacity) {
        setErrorMessage('Please fill in all fields.');
        return;
      }

      const response = await fetch('http://localhost:8080/vehicle/post', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          plateNumber,
          capacity,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
      
      setSuccessMessage('Vehicle added successfully!');
      setName('');
      setPlateNumber('');
      setCapacity('');
    } catch (error) {
      setErrorMessage('Error adding vehicle: ' + error.message);
    }
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-header">
          <h3>Add New Vehicle:</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="dialog-content">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Plate Number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="dialog-footer">
          <button onClick={handleAddVehicle}>Add</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default AddVehicle;
