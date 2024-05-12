import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import '../../CSS/userCSS/forgot-password.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSend = () => {
    if (email === 'email') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleBack = () => {
  
  };

  return (
    <div className='forgot'>
      <div className='citlogo'></div>
      <div className='logincit-bglogo'></div>
      <div className='title'>
        <h1>TRANSPORTATION RESERVATION SYSTEM</h1>
      </div>
      <div className='parent-forgot'>
      <div className='forgot-container'>
        <h2>Forgot Password</h2>
          <form>
            <label>
            <MdEmail />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </label>
            <button className='forgot-btn' type="button" onClick={handleSend}>
              Send Email
            </button>
            <button className='back-btn' type="button" onClick={handleBack}>
              Back to Login
            </button>
          </form>
      </div>
      </div>
      
    </div>
  );
};

export default ForgotPassword;