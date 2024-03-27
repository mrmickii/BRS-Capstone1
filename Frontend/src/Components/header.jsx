
import React from "react";
import '../CSS/header.css'
import { FaBus } from "react-icons/fa";

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
          <button className="header-button">LOG OUT</button>
        </div>
      </div>
    </div>
  );
}

export default Header