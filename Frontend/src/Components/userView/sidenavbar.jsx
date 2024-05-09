import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/userCSS/side-nav-bar.css';
import { BiSolidBook } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const SideNavbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="sidenavbar">
      <ul>
      <Link to="/reservation">
        <li className={activeTab === '/reservation' || activeTab === '/user_view' || activeTab === '/user_request_made' ? 'active' : ''}>
        
          <BiSolidBook size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          RESERVATION
        </li>
        </Link>
        <Link to="/notification">
        <li className={activeTab === '/notification' ? 'active' : ''}>
          <BsBellFill size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          NOTIFICATIONS
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
      <div className="laban">
        <h1>BRS WILDCATS</h1>
      </div>
    </div>
  );
};

export default SideNavbar;
