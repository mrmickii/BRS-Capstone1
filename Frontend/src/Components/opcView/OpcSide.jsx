import React, { useState, useEffect } from "react";
import Header from '../userView/Header';
import OpcNavBar from './OpcSideNavBar';
import '../../CSS/opcCSS/opc-side.css';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineCar, AiOutlineFileText } from 'react-icons/ai';

const OpcSide = () => {
  const navigate = useNavigate();
  const [approvedReservations, setApprovedReservations] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleDriverManagement = () => {
    navigate('/driver-management');
  }

  const handleVehicleManagement = () => {
    navigate('/vehicle-management');
  }

  const handleViewApproveRequests = () => {
    
  }
  useEffect(() => {
    fetchApprovedReservations();
    fetchDrivers();
    fetchVehicles(); 
  }, []);

  const fetchApprovedReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations/approved');
      if (!response.ok) {
        throw new Error('Failed to fetch approved reservation data');
      }
      const approvedReservationData = await response.json();
      setApprovedReservations(approvedReservationData);
      console.log('Success fetching approved reservation data.');
    } catch (error) {
      console.error('Error fetching approved reservation data:', error);
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
      console.log('Success fetching driver data.');
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
      console.log('Success fetching vehicle data.');
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
    }
  };

  return (
    <div className="opc-view-container">
      <Header />
      <OpcNavBar />
      <div className="opc-title">
        <h1 className="title-opc">REQUESTS</h1>
      </div>
      <div className="opc-data-container1">
        <div className="sample">
        <div class="opc-header-button-container">
            <div class="opc-header-button">
              <button id="request-button" class="header-buttons">
                <AiOutlineFileText size={20} /> REQUEST <div> <span class="number">{approvedReservations.length}</span></div>
              </button>
              <button id="driver-button" class="header-buttons" onClick={handleDriverManagement}>
                <AiOutlineUser size={20} /> DRIVER <span class="number">{drivers.length}</span>
              </button>
              <button id="vehicle-button" class="header-buttons" onClick={handleVehicleManagement}>
                <AiOutlineCar size={20} /> VEHICLE <span class="number">{vehicles.length}</span>
              </button>
            </div>
          </div>
          <div className="opc-requests-header-container">
          <div className="opc-main-requests-header">
              <h1> <AiOutlineCar size={35}/> VEHICLES </h1>
              <button onClick={handleViewApproveRequests}>View Approved Requests</button>
            </div>
          </div> 
          <div className="rdc-box">
          {approvedReservations.map((reservation, index) => (
              <div className="request-main-data-container1" key={index}>
                <div className="r-d-container-left1">
                  <h2>Type of Trip: {reservation.typeOfTrip}</h2>
                  <p>Capacity: {reservation.capacity}</p>
                  <p>Departure Time: {reservation.departureTime}</p>
                  <p>Destination To: {reservation.destinationTo}</p>
                  <div className="feedback-container1">
                    <input type="text" placeholder="Send feedback (optional)" />
                    <button>Send Feedback</button>
                  </div>
                  <h2>Vehicle Type: {reservation.vehicleType}</h2>
                  <p>Destination From: {reservation.destinationFrom}</p>
                  <p>Pick-up Time: {reservation.pickUpTime}</p>
                  <p>Reason: {reservation.reason}</p>
                </div>
                <div className="r-d-container-right1">
                  <button>Accept</button>
                  <button>Reject</button>
                  <button>View Attached File</button>
                  <button>View Feedback</button>
                </div>
              </div>
          ))}
          </div>
        </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
};

export default OpcSide;
