import React from "react";
import '../../CSS/userCSS/header.css'
import { FaBus } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { auth } from '../../firebaseConfig'; 

const Header = () => {
  const handleLogout = () => {
    auth.signOut() 
      .then(() => {
        console.log("User logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="header">
      <div className="division-one"></div>
      <div className="division-two">
        <div className="bus-icon-container">
          <FaBus size={32}/>
        </div>
        <h2 className="header-label">TRANSPORTATION RESERVATION SYSTEM</h2>
        <div className="button-container">
          <button className="header-button" onClick={handleLogout}>
            <ImExit size={18} style={{marginRight: '5px', marginBottom : '-4px'}}/>LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
