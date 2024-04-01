import React, { useState } from 'react';
import '../../CSS/userCSS/notification.css';
import { BsBellFill } from "react-icons/bs";
import Header from '../userView/header';
import SideNavBar from '../userView/sidenavbar';

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);

 
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="reservation">
      <Header />
      <SideNavBar />
      <div className="notification-container">
        <div className="noftitle">
          <h2>
            <BsBellFill size={25} style={{ marginRight: '30px', marginBottom: '-5px' }} />
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

export default Notifications;
