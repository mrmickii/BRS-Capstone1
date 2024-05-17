import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import SideNavBar from './SideNavBar';
import { FaBus } from "react-icons/fa";
import '../../CSS/userCSS/reservation.css';

const Reservation = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

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

  const handleSelectVehicle = (vehicle) => {
    navigate('/user-view', { state: { vehicleType: vehicle.vehicleType } });
  };  

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
      <div className='view-request1'>
        <button className="viewrequest-button" ><Link to="/user-request-made" style={{textDecoration: 'none', color: 'white', fontWeight: '700'}}>VIEW REQUESTS MADE</Link></button>
      </div>
      <div className='reminder'>
        <p>Note: Please select the vehicle that will be reasonable to use with its capacity</p>
      </div>
      <div className='vehicle-container'>
        {vehicles.map((vehicle, index) => (
          <div className='vehicle-info' key={index}>
            <h1 className='vehicle-name'>{vehicle.vehicleType}</h1>
            <p className='vehicle-stat'>Status: {vehicle.status}</p>
            <p className='vehicle-pn'>Plate Number: <span style={{fontSize: '16px', color: '#782324'}}>{vehicle.plateNumber}</span> </p>
              <p className='vehicle-cap'>Capacity: {vehicle.capacity}</p>

            <button
              style={{width: '200px', height: '50px', fontSize: '16px', borderRadius: '30px', fontWeight: '700'}}
              onClick={() => handleSelectVehicle(vehicle)}
            >
              Select Vehicle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservation;
