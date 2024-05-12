import React, { useState } from 'react';
import Header from '../userView/Header';
import OpcNavBar from './OpcSideNavBar'
import '../../CSS/userCSS/settings.css'; 

const OpcSettings = () => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const togglePasswordChange = () => {
    setShowPasswordChange(!showPasswordChange);
    setShowUserDetails(false); 
  };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
    setShowPasswordChange(false); 
  };

  return (
    <div className="reservation">
      <Header />
      <OpcNavBar/>
      {showPasswordChange || showUserDetails ? <div className="overlay" /> : null}
      <div className="settings-container">
        <button className="setting-button" onClick={togglePasswordChange}>
          Change Password
        </button>
        <button className="setting-button" onClick={toggleUserDetails}>
          User Details
        </button>
        {showPasswordChange && (
          <div className="floating-box">
            <h2>Change Password</h2>
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Retype New Password" />
            <button>Change Password</button>
          </div>
        )}
        {showUserDetails && (
          <div className="floating-box">
            <h2>Account Details</h2>
            <div className="user-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">John Doe</span>
          </div>
         <div className="info-item">
        <span className="info-label">Email:</span>
        <span className="info-value">john.doe@cit.edu</span>
      </div>
      
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default OpcSettings;

