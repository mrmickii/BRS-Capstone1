import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/userCSS/side-nav-bar.css';
import { BiSolidBook } from 'react-icons/bi';
import { FaFileAlt } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';

const SideNavBar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="sidenavbar">
      <ul>
      <Link to="/reservation">
        <li className={activeTab === '/reservation' || activeTab === '/user-view' || activeTab === '/user-request-made' ? 'active' : ''}>
          <BiSolidBook size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          RESERVATION
        </li>
        </Link>
        <Link to="/manage-requests">
        <li className={activeTab === '/manage-requests' ? 'active' : ''}>
          <FaFileAlt  size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          MANAGE REQUESTS
        </li>
        </Link>
        <Link to="/settings">
        <li className={activeTab === '/settings' ? 'active' : ''}>
          <IoMdSettings size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          SETTINGS
        </li>
        </Link>
      </ul>
      <div className="sublogo"></div>
      <div className="laban1">
        <h1 style={{color: 'white'}}>BRS WILDCATS</h1>
      </div>
    </div>
  );
};

export default SideNavBar;
