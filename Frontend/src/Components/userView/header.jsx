import React from "react";
import '../../CSS/userCSS/header.css'
import { FaBus } from "react-icons/fa";
import { ImExit } from "react-icons/im";

const Header = () => {
  return(
    <div className="header">
      <div className="division-one"></div>
      <div className="division-two">
        <div className="bus-icon-container">
          <FaBus size={32}/>
        </div>
        <h2 className="header-label">TRANSPORTATION RESERVATION SYSTEM</h2>
        <div className="button-container">
          <button className="header-button"><ImExit size={18} style={{marginRight: '5px', marginBottom : '-4px'}}/>LOG OUT</button>
        </div>
      </div>
    </div>
  );
}

export default Header