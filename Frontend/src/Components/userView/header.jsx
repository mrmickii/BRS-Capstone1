import React, { useState, useEffect } from "react";
import '../../CSS/userCSS/header.css'
import { FaBus } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { auth } from '../../firebaseConfig'; 

const Header = () => {
  const [userName, setUserName] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        const name = capitalizeFirstLetter(userEmail.split('@')[0].replace('.', ' ')); 
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
        <div className="logged-in-user-name">{greeting}, {userName}</div>
        <div className="button-container">
          <button className="header-button" onClick={handleLogout}>
            <ImExit size={18} style={{marginRight: '5px', marginTop : '5px'}}/>LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
