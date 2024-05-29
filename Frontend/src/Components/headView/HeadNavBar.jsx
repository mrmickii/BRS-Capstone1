import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/headCSS/head-nav-bar.css';
import { BiSolidBook } from 'react-icons/bi';
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";
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
      <Link to="/head-view">
        <li className={activeTab === '/head-view' ? 'active' : ''}>
          <BiSolidBook size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          REQUESTS
        </li>
        </Link>
        <Link to="/head-view/view-requests">
        <li style={{fontSize: "18px"}}className={activeTab === '/head-view/view-requests' ? 'active' : ''}>
          <HiMiniClipboardDocumentCheck size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          APPROVED REQUEST
        </li>
        </Link>
        <Link to="/head-view/settings">
        <li className={activeTab === '/head-view/settings' ? 'active' : ''}>
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

export default SideNavbar;
