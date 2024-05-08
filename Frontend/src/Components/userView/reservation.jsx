import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../userView/header';
import SideNavBar from '../userView/sidenavbar';
import { FaBus } from "react-icons/fa";
import '../../CSS/userCSS/reservation.css';

const Reservation = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
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

    fetchVehicles();
  }, []);

  return (
    <div className="reservation">
      <Header />
      <SideNavBar />
      <div className='subheader'>
        <h2>RESERVATION</h2>
      </div>
      <div className='subheader2'>
        <h2><FaBus size={32} style={{marginRight: '15px', marginBottom: '-5px'}}/>SELECT VEHICLE</h2>
      </div>
      <div className='view-request'>
        <Link to="/user_request_made" className="viewrequest-button" style={{textDecoration: 'none'}}>VIEW REQUESTS MADE</Link>
      </div>
      <div className='reminder'>
        <p>Note: Please select the vehicle that will be reasonable to use with its capacity</p>
      </div>
      <div className='vehicle-container'>
        {vehicles.map((vehicle, index) => (
          <div className='vehicle-info' key={index}>
            <h1 className='vehicle-name'>{vehicle.name}
            <p>Status: </p>
            {/* Insert diri ang availability status */}
            </h1>
            <p className='vehicle-pn-cap'>Plate Number: {vehicle.plateNumber}
              <p>Capacity: {vehicle.capacity}</p>
            </p>
            <button>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
