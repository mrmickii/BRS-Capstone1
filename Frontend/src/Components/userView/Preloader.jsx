import React, { useState, useEffect } from 'react';
import '../../CSS/userCSS/preloader.css'; 
import spinnerImage from '../../Images/loadingscreen.png'; 

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
   
    if (!loading) {
      const fadeOutTimer = setTimeout(() => {
        setFadeOut(true);
      }, 200); 

      return () => clearTimeout(fadeOutTimer);
    }
  }, [loading]);

  return (
    <div className={`preloader ${loading ? 'active' : ''} ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader">
        <div className="spinner"></div>
        <img src={spinnerImage} alt="Spinner" className="image" />
      </div>
    </div>
  );
};

export default Preloader;
