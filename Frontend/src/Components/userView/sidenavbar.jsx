import React from 'react';
import '../../CSS/userCSS/sidenavbar.css'
import { BiSolidBook } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";




const SideNavbar = () => {
  return (
    <div className="sidenavbar">
    
      <ul>
        <li><BiSolidBook size={26} style ={{marginRight: '30px', marginLeft: '20px', marginBottom: '-5px'}}/>RESERVATION</li>
        <li><BsBellFill  size={26} style ={{marginRight: '30px',  marginLeft: '20px', marginBottom: '-5px'}}/>NOTIFICATIONS</li>
        <li><IoMdSettings size={26} style ={{marginRight: '30px',  marginLeft: '20px', marginBottom: '-5px'}}/>SETTINGS</li>

      </ul>
    </div>
  );
}

export default SideNavbar;
