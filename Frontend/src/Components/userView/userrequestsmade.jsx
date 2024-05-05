import React from 'react';
import Header from '../userView/header';
import SideNavBar from '../userView/sidenavbar';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import '../../CSS/userCSS/userrequestsmade.css';

const UserRequestsMade = () => {
  const goBack = () => {
    window.history.back(); 
  };

  return (
    <div className="reservation">
      <Header />
      <SideNavBar />
      <div className='subheader'>
        <h2>REQUESTS MADE</h2>
      </div>
      <button onClick={goBack} className="back-button"><IoArrowBackCircleSharp size={20} style={{marginRight:'10px', marginBottom: '-4px'}}/> Back to reservation</button>
      <div className='requestsmade-container'>
        {/* Content for requests made container */}
      </div>
    </div>
  );
};

export default UserRequestsMade;
