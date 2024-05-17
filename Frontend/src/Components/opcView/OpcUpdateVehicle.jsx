import React, { useState } from 'react';
import '../../CSS/opcCSS/opc-update-vehicle.css';

const UpdateVehicle = ({ vehicle, onUpdate, onClose }) => {
  const [updatedVehicleType, setUpdatedVehicleType] = useState(vehicle.name);
  const [updatedPlateNumber, setUpdatedPlateNumber] = useState(vehicle.plateNumber);
  const [updatedCapacity, setUpdatedCapacity] = useState(vehicle.capacity);
  const [updatedStatus, setUpdatedStatus] = useState(vehicle.capacity);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdateVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/vehicle/update/${vehicle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleType: updatedVehicleType,
          plateNumber: updatedPlateNumber,
          capacity: updatedCapacity,
          status: updatedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }

      onUpdate({
        vehicleType: updatedVehicleType,
        plateNumber: updatedPlateNumber,
        capacity: updatedCapacity,
        status: updatedStatus,
      });

      setSuccessMessage('Vehicle information updated successfully!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      setErrorMessage('Error updating vehicle: ' + error.message);
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
          <h3>Update Vehicle Information</h3>
          <button onClick={handleClose}>X</button>
        </div>
        <input
          type="text"
          value={updatedVehicleType}
          onChange={(e) => setUpdatedVehicleType(e.target.value)}
          placeholder="Vehicle Name"
        />
        <input
          type="text"
          value={updatedPlateNumber}
          onChange={(e) => setUpdatedPlateNumber(e.target.value)}
          placeholder="Plate Number"
        />
        <input
          type="number"
          value={updatedCapacity}
          onChange={(e) => setUpdatedCapacity(e.target.value)}
          placeholder="Capacity"
        />
        <div className="update-dialog-buttons">
          <button onClick={handleUpdateVehicle}>Update</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default UpdateVehicle;
