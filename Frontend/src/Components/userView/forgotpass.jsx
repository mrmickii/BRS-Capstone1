import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import '../../CSS/userCSS/forgotpass.css';

const ForgotPass = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
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
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
              />
            </label>
            <button className='forgot-btn' type="button" onClick={handleLogin}>
              Send Email
            </button>
            <button className='back-btn' type="button" onClick={handleClear}>
              Back to Login
            </button>
          </form>
      </div>
      </div>
      
    </div>
  );
};

export default ForgotPass;
