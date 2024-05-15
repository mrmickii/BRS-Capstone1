import React, { useState } from 'react';
import '../../CSS/headCSS/head-notification.css';
import { BsBellFill } from "react-icons/bs";
import Header from '../userView/Header';
import HeadNavBar from './HeadNavbar'


const HeadNotifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);

 
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="notifications">
      <Header />
      <HeadNavBar />
      <div className="notification-container">
        <div className="noftitle">
          <h2 style={{color: 'white'}}>
            <BsBellFill size={25} style={{ marginRight: '20px', marginBottom: '-5px' }} />
            NOTIFICATION
          </h2>
        </div>
        {showNotifications && (
          <div className="notification-list">
            <div className="notification white-container">
              <div className="notification-item">Notification 1</div>
            </div>
            <div className="notification white-container">
              <div className="notification-item">Notification 2</div>
            </div>
            <div className="notification white-container">
              <div className="notification-item">Notification 3</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadNotifications;
