import React, { useState, useEffect } from 'react';
import Header from '../userView/Header';
import OpcNavBar from './OpcSideNavBar';
import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { FaBus } from "react-icons/fa";
import DeleteConfirmationDialogBox from './OpcDeleteVehicle'; 
import UpdateDialogBox from './OpcUpdateVehicle'; 
import AddVehicle from './OpcAddVehicle'; 
import "../../CSS/opcCSS/opc-vehicle.css"; 
import { FaRectangleAd } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";

const OpcVehicle = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [vehicleToUpdate, setVehicleToUpdate] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);

  useEffect(() => {
    fetchReservations();
    fetchVehicles();
    fetchDrivers(); 
  }, []);

  useEffect(() => {
    setVehicleCount(vehicles.length);
  }, [vehicles]);

  useEffect(() => {
    setDriverCount(drivers.length); 
  }, [drivers]);

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

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8080/driver/drivers');
      if (!response.ok) {
        throw new Error('Failed to fetch drivers data');
      }
      const driverData = await response.json();
      setDrivers(driverData);
    } catch (error) {
      console.error('Error fetching drivers data:', error);
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

  const handleAddVehicle = () => {
    setShowAddVehicleDialog(true);
  };

  const handleDeleteVehicle = (vehicle) => {
    setShowDeleteConfirmationDialog(true);
    setVehicleToUpdate(vehicle);
  };

  const handleUpdateVehicle = (vehicle) => {
    setShowUpdateDialog(true);
    setVehicleToUpdate(vehicle);
  };

  const confirmDeleteVehicle = async () => {
    try {
      const response = await fetch(`http://localhost:8080/vehicle/delete/${vehicleToUpdate.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }

      const updatedVehicles = vehicles.filter(v => v.id !== vehicleToUpdate.id);
      setVehicles(updatedVehicles);
      setShowDeleteConfirmationDialog(false);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const confirmUpdateVehicle = async (updatedVehicle) => {
    try {
      const response = await fetch(`http://localhost:8080/vehicle/update/${updatedVehicle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVehicle),
      });

      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }

      const updatedVehicles = vehicles.map(v => {
        if (v.id === updatedVehicle.id) {
          return updatedVehicle;
        }
        return v;
      });
      setVehicles(updatedVehicles);
      setShowUpdateDialog(false);
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  const filteredApprovedReservations = reservations.filter(reservation => !reservation.opcIsApproved && reservation.headIsApproved && !reservation.rejected);

  return (
    <div className="opc-view-container">
      <Header />
      <OpcNavBar />
      <div className="opc-title" style={{marginBottom: '30px', marginRight: '850px'}}>
        <h1 style={{fontSize: '46px'}}>VEHICLES</h1>
      </div>
      <div className="vehicle-data-container1">
        <div className="sample">
          <div className="opc-vehicle-header-button-container">
            <div className="opc-vehicle-header-button">
              <button className="header-buttons" onClick={handleRequest}>
                <AiOutlineFileText size={40} style={{ marginLeft: '19px' }} /> REQUEST <span className="number">{filteredApprovedReservations.length}</span>
              </button>
              <button className="header-buttons" onClick={handleDriverManagement} >
                <AiOutlineUser size={40} style={{ marginLeft: '37px' }} /> DRIVER <span className="number">{driverCount}</span>
              </button>
              <button className="header-buttons" id="vehicleButton" onClick={handleVehicleManagement} style={{backgroundColor: "#f4c108"}}>
                <FaBus size={40} style={{ marginLeft: '25px' }} /> VEHICLE <span className="number">{vehicleCount}</span>
              </button>
            </div>
          </div>
          <div className="opc-vehicle-requests-header-container">
            <div className="opc-vehicle-requests-header">
              <h1> <FaBus size={32} style={{ marginRight: '10px' }} /> VEHICLES </h1>
              <button onClick={handleAddVehicle}  style={{fontSize: "14px"}}>Add Vehicle</button>
            </div>
          </div>
          <div className="rdc-box1">
            {vehicles.length === 0 ? (
              <p className='vehicle-availability'>No vehicles available.</p>
            ) : (
              <div className="request-vehicle-data-container1">
                {vehicles.map((vehicle, index) => (
                  <div className='vehicle-info' key={index}>
                    <div className='vechile-info-d1'>
                      <h1>{vehicle.vehicleType}</h1>
                      <p className="vehicle-info-plate"><FaRectangleAd size={24} style={{marginRight: '10px', marginBottom: '-5px'}}/>Plate Number: {vehicle.plateNumber}</p>
                      <p className="vehicle-info-capa"><IoMdPersonAdd size={24} style={{marginRight: '10px', marginBottom: '-5px'}}/>Capacity: {vehicle.capacity}</p>
                    </div>
                    <div className='vehicle-info-d2'>
                      <button className="vehicle-update-button" onClick={() => handleUpdateVehicle(vehicle)}>Update</button>
                      <button className="vehicle-delete-button" onClick={() => handleDeleteVehicle(vehicle)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showAddVehicleDialog && <AddVehicle onClose={() => setShowAddVehicleDialog(false)} />} 
        {showDeleteConfirmationDialog && <DeleteConfirmationDialogBox onClose={() => setShowDeleteConfirmationDialog(false)} onDelete={confirmDeleteVehicle} />}
        {showUpdateDialog && <UpdateDialogBox vehicle={vehicleToUpdate} onUpdate={confirmUpdateVehicle} onClose={() => setShowUpdateDialog(false)} />}
        <div className='cit-bglogo'></div>
      </div>
    </div>
  );
}

export default OpcVehicle;
