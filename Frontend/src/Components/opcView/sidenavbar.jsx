import React from 'react';
import '../../CSS/opcCSS/sidenavbar.css'
import { BiHome } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";




const OpcSideNavbar = () => {
  return (
    <div className="sidenavbar">
    
      <ul>
        <li><BiHome size={26} style ={{marginRight: '30px', marginLeft: '20px', marginBottom: '-5px'}}/>HOME</li>
        <li><BsBellFill  size={26} style ={{marginRight: '30px',  marginLeft: '20px', marginBottom: '-5px'}}/>NOTIFICATIONS</li>
        <li><IoMdSettings size={26} style ={{marginRight: '30px',  marginLeft: '20px', marginBottom: '-5px'}}/>SETTINGS</li>

      </ul>
    </div>
  );
}

export default OpcSideNavbar;
