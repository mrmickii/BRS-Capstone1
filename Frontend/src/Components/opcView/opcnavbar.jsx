import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/userCSS/sidenavbar.css';
import { MdSpaceDashboard } from "react-icons/md";
import { BsBellFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const OpcNavbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="sidenavbar">
      <ul>
      <Link to="/staff_view">
        <li className={activeTab === '/staff_view' || activeTab === '/staff_view' ? 'active' : ''}>
          <MdSpaceDashboard size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          DASHBOARD
        </li>
        </Link>
        <Link to="/notification">
        <li className={activeTab === '/opcnotification' ? 'active' : ''}>
          <BsBellFill size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          NOTIFICATIONS
        </li>
        </Link>
        <Link to="/settings">
          
        <li className={activeTab === '/opcsettings' ? 'active' : ''}>
        
          <IoMdSettings size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          SETTINGS
          
        </li>
        </Link>
      </ul>

      <div className="sublogo"></div>
      <div className="laban">
        <h1>BRS WILDCATS</h1>
      </div>
    </div>
  );
};

export default OpcNavbar;
