import React, { useState, useEffect } from "react";
import '../../CSS/userCSS/header.css'
import { FaBus } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { auth } from '../../FirebaseConfig'; 

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userName = user.email;
        const name = capitalizeFirstLetter(userName.split('@')[0].replace('.', ' ')); 
        setUserName(name); 
      } else {
        setUserName(null); 
      }
    });

    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("☀️ Good Morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("⛅ Good Afternoon");
    } else {
      setGreeting("🌙 Good Evening");
    }

    return () => unsubscribe();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };  

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User logged out successfully");
        
        // Clear session storage or local storage
        sessionStorage.clear();
        localStorage.clear();
        
        // Redirect to login page
        window.location.href = '/login';
  
        setShowLogoutModal(false);
      })
      .catch((error) => {
        console.error("Logout error:", error);
        setShowLogoutModal(false);
      });
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="header">
      <div className="division-one"></div>
      <div className="division-two">
        <div className="bus-icon-container">
          <FaBus size={32}/>
        </div>
        <h2 className="header-label" style={{marginTop: "15px"}}>TRANSPORTATION RESERVATION SYSTEM</h2>
        <div className="logged-in-user-name">{greeting}, {userName}</div>
        <div className="button-container">
          <button className="header1-button" onClick={handleLogout}>
            <ImExit size={18} style={{marginRight: '5px', marginBottom: '-4px'}}/>LOG OUT
          </button>
        </div>
      </div>

      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <p style={{color: '#782324', fontWeight: '700', marginBottom: '50px'}}>Are you sure you want to log out?</p>
            <button className="yes-btn"onClick={confirmLogout}>Yes</button>
            <button className="no-btn" onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
