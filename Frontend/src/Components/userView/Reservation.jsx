import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaClipboardList } from "react-icons/fa";
import SideNavBar from './SideNavBar';
import { FaBus } from "react-icons/fa";
import { auth } from '../../FirebaseConfig'; 
import { BsPersonFillCheck } from "react-icons/bs";
import '../../CSS/userCSS/reservation.css';

const Reservation = () => {
  const [vehicles, setVehicles] = useState([]);
  const [userName, setUserName] = useState(null); 
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

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        const name = capitalizeFirstLetter(userEmail.split('@')[0].replace('.', ' ')); 
        setUserName(name); 
        console.log("User logged in:", name); 
      } else {
        setUserName(null); 
      }
    });
    return () => unsubscribe(); 
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleSelectVehicle = (vehicle) => {
    navigate('/user-view', { state: { vehicleType: vehicle.vehicleType } });
  };  

  return (
    <div className="reservation">
      <Header userName={userName} /> 
      <SideNavBar />
      <div className='subheader'>
        <h1>RESERVATION</h1>
      </div>
      <div className='subheader3'>
        <h2><FaBus size={32} style={{marginRight: '15px', marginBottom: '-5px'}}/>SELECT VEHICLE</h2>
      </div>
      <div className='view-request1'>
        <button className="viewrequest-button" ><Link to="/user-request-made" style={{textDecoration: 'none', color: 'white', fontWeight: '700'}}><FaClipboardList style={{marginRight: '10px'}}/>VIEW REQUESTS MADE</Link></button>
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
              <p className='vehicle-cap'><BsPersonFillCheck  size={18} style={{marginRight: '15px', color: '#782324'}}/>Capacity: 
                <span style={{fontSize: '16px', color: '#782324'}}>{vehicle.capacity}</span>
              </p>
            <button
              style={{width: '200px', height: '50px', fontSize: '16px', borderRadius: '30px', fontWeight: '700'}}
              onClick={() => handleSelectVehicle(vehicle)}>
              Select Vehicle
            </button>
          </div>
        ))}
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default Reservation;
