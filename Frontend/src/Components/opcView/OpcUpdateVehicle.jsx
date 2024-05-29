import React, { useState, useEffect } from 'react';
import '../../CSS/opcCSS/opc-update-vehicle.css';

const UpdateVehicle = ({ vehicle, onUpdate, onClose }) => {
  const [updatedVehicleType, setUpdatedVehicleType] = useState('');
  const [updatedPlateNumber, setUpdatedPlateNumber] = useState('');
  const [updatedCapacity, setUpdatedCapacity] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (vehicle) {
      setUpdatedVehicleType(vehicle.vehicleType || '');
      setUpdatedPlateNumber(vehicle.plateNumber || '');
      setUpdatedCapacity(vehicle.capacity || '');
      setUpdatedStatus(vehicle.status || '');
    }
  }, [vehicle]);

  const handleUpdateVehicle = async () => {
    // Check for empty fields
    if (!updatedVehicleType || !updatedPlateNumber || !updatedCapacity || !updatedStatus) {
      setErrorMessage('All fields are required.');
      setSuccessMessage('');
      return;
    }

    // Validate plate number format
    const plateNumberPattern = /^[A-Z0-9]{3}-[A-Z0-9]{3}$/;
    if (!plateNumberPattern.test(updatedPlateNumber)) {
      setErrorMessage('Plate number must be in the format XXX-XXX, where X can be a letter or a digit.');
      setSuccessMessage('');
      return;
    }

    // Check for changes
    if (
      updatedVehicleType === vehicle.vehicleType &&
      updatedPlateNumber === vehicle.plateNumber &&
      updatedCapacity === vehicle.capacity &&
      updatedStatus === vehicle.status
    ) {
      setErrorMessage('No changes detected.');
      setSuccessMessage('');
      return;
    }

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
        id: vehicle.id,
        vehicleType: updatedVehicleType,
        plateNumber: updatedPlateNumber,
        capacity: updatedCapacity,
        status: updatedStatus,
      });

      setSuccessMessage('Vehicle information updated successfully!');
      setErrorMessage('');
      alert('Vehicle information updated successfully!');
    } catch (error) {
      console.error('Error updating vehicle:', error);
      setErrorMessage('Error updating vehicle: ' + error.message);
      setSuccessMessage('');
    }
  };

  const handleClose = () => {
    onClose();
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
