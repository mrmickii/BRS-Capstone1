import React, { useState, useEffect } from 'react';
import Header from '../userView/header';
import OpcNavBar from '../opcView/opcnavbar';
import { AiOutlineUser, AiOutlineCar, AiOutlineFileText } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import VehicleDialogBox from './opcAddVehicle';
import DeleteConfirmationDialogBox from './opcDeleteVehicle'; 
import UpdateDialogBox from './opcUpdateVehicle'; 
import AddVehicle from './opcAddVehicle'; 
import "../../CSS/opcCSS/opcVehicle.css"; 

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
    navigate('/staff_view');
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

  return (
    <div className="opc-view-container">
      <Header />
      <OpcNavBar />
      <div className="opc-title">
        <h1 className="title-opc">VEHICLES</h1>
      </div>
      <div className="data-container1">
        <div className="sample">
          <div className="opc-header-button-container">
            <div className="opc-header-button">
              <button className="header-buttons" onClick={handleRequest}>
                <AiOutlineFileText size={20} style={{ marginLeft: '19px' }} /> Request <span className="number">{reservations.length}</span>
              </button>
              <button className="header-buttons" onClick={handleDriverManagement}>
                <AiOutlineUser size={20} style={{ marginLeft: '37px' }} /> Driver <span className="number">{driverCount}</span>
              </button>
              <button className="header-buttons" id="vehicleButton" onClick={handleVehicleManagement}>
                <AiOutlineCar size={20} style={{ marginLeft: '25px' }} /> Vehicle <span className="number">{vehicleCount}</span>
              </button>
            </div>
          </div>
          <div className="opc-requests-header-container">
            <div className="opc-requests-header">
              <h1> <AiOutlineCar size={35}/> VEHICLES </h1>
              <button onClick={handleAddVehicle}>Add Vehicle</button>
            </div>
          </div>
        </div>
        <div className="vehicle-data">
          {vehicles.length === 0 ? (
            <p className='vehicle-availability'>No vehicles available.</p>
          ) : (
            <div className="vehicle-data-container">
              {vehicles.map((vehicle, index) => (
                <div className='vehicle-info' key={index}>
                  <h1 className='vecihle-info-h1'>{vehicle.name}
                    <button className='vehicle-update-button' onClick={() => handleUpdateVehicle(vehicle)}>Update
                    </button>
                  </h1>
                  <p className='vecihle-info-p'>Plate Number: {vehicle.plateNumber}
                    <button className='vehicle-delete-button' onClick={() => handleDeleteVehicle(vehicle)}>Delete
                    </button>
                  </p>
                  <p className='vecihle-info-p'>Capacity: {vehicle.capacity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {showAddVehicleDialog && <AddVehicle onClose={() => setShowAddVehicleDialog(false)} />} {/* Changed component */}
      {showDeleteConfirmationDialog && <DeleteConfirmationDialogBox onClose={() => setShowDeleteConfirmationDialog(false)} onDelete={confirmDeleteVehicle} />}
      {showUpdateDialog && <UpdateDialogBox vehicle={vehicleToUpdate} onUpdate={confirmUpdateVehicle} onClose={() => setShowUpdateDialog(false)} />}
    </div>
  );
}

export default OpcVehicle;
