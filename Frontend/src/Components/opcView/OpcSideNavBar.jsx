import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/opcCSS/opc-side-nav-bar.css';
import { MdSpaceDashboard } from "react-icons/md";
import { BsBellFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const OpcSideNavBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="sidenavbar">
      <ul>
      <Link to="/staff-view">
        <li className={activeTab === '/staff-view' || activeTab === '/driver-management' || activeTab === '/vehicle-management' ? 'active' : ''}>
          <MdSpaceDashboard size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          DASHBOARD
        </li>
        </Link>
        <Link to="/opc-view/approved-requests">
        <li className={activeTab === '/opc-view/approved-requests' ? 'active' : ''} style={{fontSize: "18px"}}>
          <BsBellFill size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          APPROVED REQUESTS
        </li>
        </Link>
        <Link to="/opc-vew/settings">
          
        <li className={activeTab === '/opc-vew/settings' ? 'active' : ''}>
        
          <IoMdSettings size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          SETTINGS
          
        </li>
        </Link>
      </ul>

      <div className="sublogo"></div>
      <div className="laban">
        <h1 style={{color: 'white'}}>BRS WILDCATS</h1>
      </div>
    </div>
  );
};

export default OpcSideNavBar;
