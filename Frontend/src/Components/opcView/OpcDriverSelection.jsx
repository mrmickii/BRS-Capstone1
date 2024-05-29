import React, { useState } from 'react';
import '../../CSS/opcCSS/opc-driver-selection.css';

const DriverSelectionDialog = ({ drivers, onSelectDriver, onCancel }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  const confirmSelection = () => {
    if (selectedDriver) {
      onSelectDriver(selectedDriver.id, selectedDriver.driverName);
      window.alert("Request approved Successfully");
    }
  };

  return (
    <div className="driver-selection-modal">
      <div className="modal-content">
        <span className="modal-close-span">
          <p className="modal-close-btn" onClick={onCancel}>x</p>
        </span>
        <h2>Select a Driver</h2>
        <ul>
          {drivers.map(driver => (
            <li 
              key={driver.id} 
              className={selectedDriver && selectedDriver.id === driver.id ? 'selected' : ''} 
              onClick={() => handleSelectDriver(driver)}
              style={{
                backgroundColor: selectedDriver && selectedDriver.id === driver.id ? '#782324' : 'transparent',
                color: selectedDriver && selectedDriver.id === driver.id ? 'white' : 'black'
              }}
            >
              {driver.driverName}
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={confirmSelection} disabled={!selectedDriver}>Confirm</button>&nbsp;&nbsp;&nbsp;
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DriverSelectionDialog;
