import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../CSS/headCSS/headnavbar.css';
import { BiSolidBook } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const HeadNavbar = () => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);

  return (
    <div className="sidenavbar">
      <ul>
        <li className={activeTab === '/head_view' ? 'active' : ''}>
          <NavLink to="/head_view">
            <BiSolidBook size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
            REQUESTS
          </NavLink>
        </li>
        <li className={activeTab === '/head_view/notification' ? 'active' : ''}>
          <NavLink to="/head_view/notification">
            <BsBellFill size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
            NOTIFICATIONS
          </NavLink>
        </li>
        <li className={activeTab === '/head_view/settings' ? 'active' : ''}>
          <NavLink to="/head_view/settings">
            <IoMdSettings size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
            SETTINGS
          </NavLink>
        </li>
      </ul>

      <div className="sublogo"></div>
      <div className="laban">
        <h1>BRS WILDCATS</h1>
      </div>
    </div>
  );
};

export default HeadNavbar;
