import React, { useState, useEffect } from 'react';
import Header from '../userView/header';
import OpcNavBar from '../opcView/opcnavbar';
import { AiOutlineUser, AiOutlineCar, AiOutlineFileText } from 'react-icons/ai';
import '../../CSS/opcCSS/opcDriver.css';
import { useNavigate } from 'react-router-dom';
import DialogBox from './opcAddDriver'; 
import DeleteConfirmationDialogBox from './opcDeleteDriver';
import UpdateDialogBox from './opcUpdateDriver'; 

const OpcDriver = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showAddDriverDialog, setShowAddDriverDialog] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [driverToUpdate, setDriverToUpdate] = useState(null);
  const [driverCount, setDriverCount] = useState(0); 
  const [vehicleCount, setVehicleCount] = useState(0); 

  useEffect(() => {
    fetchReservations();
    fetchDrivers();
    fetchVehicles();
  }, []);

  useEffect(() => {
    setDriverCount(drivers.length); 
  }, [drivers]);

  useEffect(() => {
    setVehicleCount(vehicles.length); 
  }, [vehicles]);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservation data');
      }
      const reservationData = await response.json();
      setReservations(reservationData);
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8080/driver/drivers');
      if (!response.ok) {
        throw new Error('Failed to fetch driver data');
      }
      const driverData = await response.json();
      setDrivers(driverData);
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8080/vehicle/vehicles');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicle data');
      }
      const vehicleData = await response.json();
      setVehicles(vehicleData);
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  const handleDriverManagement = () => {
    navigate('/driver-management');
  };

  const handleVehicleManagement = () => {
    navigate('/vehicle-management');
  };

  const handleRequest = () => {
    navigate('/staff_view');
  };

  const handleAddDriver = () => {
    setShowAddDriverDialog(true);
  };

  const handleDeleteDriver = (driver) => {
    setShowDeleteConfirmationDialog(true);
    setDriverToUpdate(driver); 
  };

  const handleUpdateDriver = (driver) => {
    setShowUpdateDialog(true);
    setDriverToUpdate(driver); 
  };

  const confirmDeleteDriver = async () => {
    try {
      const response = await fetch(`http://localhost:8080/driver/delete/${driverToUpdate.id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete driver');
      }
  
      const updatedDrivers = drivers.filter(d => d.id !== driverToUpdate.id);
      setDrivers(updatedDrivers);
      setShowDeleteConfirmationDialog(false);
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const confirmUpdateDriver = async (updatedDriver) => {
    try {
      const response = await fetch(`http://localhost:8080/driver/update/${updatedDriver.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDriver),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update driver');
      }
  
      const updatedDrivers = drivers.map(d => {
        if (d.id === updatedDriver.id) {
          return updatedDriver;
        }
        return d;
      });
      setDrivers(updatedDrivers);
      setShowUpdateDialog(false);
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  return (
    <div className="opc-view-container">
      <Header />
      <OpcNavBar />
      <div className="opc-title">
        <h1 className="title-opc">DRIVERS</h1>
      </div>
      <div className="data-container1">
        <div className="sample">
          <div className="opc-header-button-container">
            <div className="opc-header-button">
              <button className="header-buttons" onClick={handleRequest}>
                <AiOutlineFileText size={20} style={{ marginLeft: '19px' }} /> Request <span className="number">{reservations.length}</span>
              </button>
              <button className="header-buttons" id="driverButton" onClick={handleDriverManagement}>
                <AiOutlineUser size={20} style={{ marginLeft: '37px' }} /> Driver <span className="number">{driverCount}</span>
              </button>
              <button className="header-buttons" onClick={handleVehicleManagement}>
                <AiOutlineCar size={20} style={{ marginLeft: '25px' }} /> Vehicle <span className="number">{vehicleCount}</span>
              </button>
            </div>
          </div>
          <div className="opc-requests-header-container">
            <div className="opc-requests-header">
              <h1> <AiOutlineUser size={35}/> DRIVERS </h1>
              <button onClick={handleAddDriver}>Add Driver</button>
            </div> 
          </div> 
        </div> 
        <div className="driver-data">
          {drivers.length === 0 ? (
            <p className='driver-availability'>No drivers available.</p>
          ) : (
            <div className="driver-data-container">
              {drivers.map((driver, index) => (
                <div className='driver-info' key={index}>
                  <h1>{driver.driverName}
                    <button className='driver-update-button' onClick={() => handleUpdateDriver(driver)}>Update
                    </button>
                  </h1> 
                  <p>Contact Number: {driver.contactNumber}
                    <button className='driver-delete-button' onClick={() => handleDeleteDriver(driver)}>Delete
                    </button>
                  </p> 
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='cit-bglogo'></div>
      </div>
      {showAddDriverDialog && <DialogBox onClose={() => setShowAddDriverDialog(false)} />}
      {showDeleteConfirmationDialog && <DeleteConfirmationDialogBox onClose={() => setShowDeleteConfirmationDialog(false)} onDelete={confirmDeleteDriver} />}
      {showUpdateDialog && <UpdateDialogBox driver={driverToUpdate} onUpdate={confirmUpdateDriver} onClose={() => setShowUpdateDialog(false)} />}
    </div>
  );
}

export default OpcDriver;
