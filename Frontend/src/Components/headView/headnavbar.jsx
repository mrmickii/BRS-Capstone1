import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../CSS/userCSS/sidenavbar.css';
import { BiSolidBook } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';

const HeadNavbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  return (
    <div className="sidenavbar">
      <ul>
      <Link to="/head_view">
        <li className={activeTab === '/head_view' ? 'active' : ''}>
          <BiSolidBook size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          REQUESTS
        </li>
        </Link>
        <Link to="/head_view/notification">
        <li className={activeTab === '/head_view/notification' ? 'active' : ''}>
          <BsBellFill size={26} style={{ marginRight: '30px', marginLeft: '20px', marginBottom: '-5px' }} />
          NOTIFICATIONS
        </li>
        </Link>
        <Link to="/head_view/settings">
        <li className={activeTab === '/head_view/settings' ? 'active' : ''}>
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

export default HeadNavbar;
