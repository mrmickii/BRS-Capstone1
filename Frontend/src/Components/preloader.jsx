import React, { useState, useEffect } from 'react';
import '../CSS/preloader.css'; 
import spinnerImage from '../Images/loadingscreen.png'; 

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${loading ? 'active' : ''}`}>
      <div className="loader">
        <div className="spinner"></div>
        <img src={spinnerImage} alt="Spinner" className="image" />
      </div>
    </div>
  );
};

export default Preloader;
