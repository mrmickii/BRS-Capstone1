import React, { useState, useEffect } from 'react';
import Header from '../userView/Header';
import OpcNavBar from './OpcSideNavBar';
import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai';
import { FaBus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import DialogBox from './OpcAddDriver';
import DeleteConfirmationDialogBox from './OpcDeleteDriver';
import UpdateDialogBox from './OpcUpdateDriver';
import '../../CSS/opcCSS/opc-driver.css';

const OpcDriver = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showAddDriverDialog, setShowAddDriverDialog] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [driverToUpdate, setDriverToUpdate] = useState(null);

  useEffect(() => {
    fetchReservations();
    fetchDrivers();
    fetchVehicles();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations');
      if (!response.ok) throw new Error('Failed to fetch reservation data');
      const reservationData = await response.json();
      setReservations(reservationData);
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8080/driver/drivers');
      if (!response.ok) throw new Error('Failed to fetch driver data');
      const driverData = await response.json();
      setDrivers(driverData);
    } catch (error) {
      console.error('Error fetching driver data:', error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8080/vehicle/vehicles');
      if (!response.ok) throw new Error('Failed to fetch vehicle data');
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
    navigate('/staff-view');
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
      const response = await fetch(`http://localhost:8080/driver/delete/${driverToUpdate.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete driver');
      setDrivers(drivers.filter(d => d.id !== driverToUpdate.id));
      setShowDeleteConfirmationDialog(false);
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const confirmUpdateDriver = async (updatedDriver) => {
    try {
      const response = await fetch(`http://localhost:8080/driver/update/${updatedDriver.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDriver),
      });
      if (!response.ok) throw new Error('Failed to update driver');
      setDrivers(drivers.map(d => (d.id === updatedDriver.id ? updatedDriver : d)));
      setShowUpdateDialog(false);
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const filteredApprovedReservations = reservations.filter(reservation => !reservation.opcIsApproved && reservation.headIsApproved && !reservation.rejected);

  return (
    <div className="opc-view-container">
      <Header />
      <OpcNavBar />
      <div className="opc-title" style={{ marginBottom: '30px', marginRight: '870px' }}>
        <h1 style={{ fontSize: '46px' }}>DRIVERS</h1>
      </div>
      <div className="driver-data-container1">
        <div className="sample">
          <div className="opc-header-button-container">
            <div className="opc-header-button">
              <button className="header-buttons" onClick={handleRequest}>
                <AiOutlineFileText size={40} style={{ marginLeft: '19px' }} /> REQUEST <span className="number">{filteredApprovedReservations.length}</span>
              </button>
              <button className="header-buttons" onClick={handleDriverManagement} style={{backgroundColor: "#f4c108"}}>
                <AiOutlineUser size={40} style={{ marginLeft: '37px' }} /> DRIVER <span className="number">{drivers.length}</span>
              </button>
              <button className="header-buttons" id="vehicleButton" onClick={handleVehicleManagement}>
                <FaBus size={40} style={{ marginLeft: '25px' }} /> VEHICLE <span className="number">{vehicles.length}</span>
              </button>
            </div>
          </div>
          <div className="opc-requests-header-container">
            <div className="opc-driver-requests-header">
              <h1><AiOutlineUser size={35} style={{ marginRight: '10px' }} />DRIVERS</h1>
              <button onClick={handleAddDriver} style={{fontSize: "16px"}}>Add Driver</button>
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
                      <button className='driver-update-button' onClick={() => handleUpdateDriver(driver)}>Update</button>
                    </h1>
                    <p style={{fontWeight: "600"}}>
                      Contact Number: {driver.contactNumber}
                      <p>Status:&nbsp;&nbsp;<span style={{ color: driver.status === 'Available' ? 'green' : 'maroon' }}> {driver.status}</span></p>
                      <button className='driver-delete-button' onClick={() => handleDeleteDriver(driver)}>Delete</button>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
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