import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../userView/header';
import SideNavBar from '../userView/sidenavbar';
import { FaBus } from "react-icons/fa";
import '../../CSS/userCSS/reservation.css';

const Reservation = () => {
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
        <Link to="/user_request_made" className="viewrequest-button" style={{textDecoration: 'none'}}>VIEW REQUESTS MADE</Link>
      </div>
      <div className='reminder'>
        <p>Note: Please select the vehicle that will be reasonable to use with its capacity</p>
      </div>
      <div className='vehicle-container'>
      </div>
    </div>
  );
};

export default Reservation;
