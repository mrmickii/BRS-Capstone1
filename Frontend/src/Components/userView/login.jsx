import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import '../../CSS/userCSS/login.css';

const Login = () => {
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
    <div className='main'>
      <div className='citlogo'></div>
     
      <div className='title'>
        <h1>TRANSPORTATION RESERVATION SYSTEM</h1>
      </div>
      <div className='login-container'>
        <h2>User Authentication</h2>
        {isLoggedIn ? (
          <p>You are logged in!</p>
        ) : (
          <form>
            <label>
              <FaUser />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </label>
            <label>
              <FaLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </label>
            <button className='login-btn' type="button" onClick={handleLogin}>
              LOGIN
            </button>
            <button className='clear-btn' type="button" onClick={handleClear}>
              CLEAR ENTITIES
            </button>
            <div className='fpass'>
              <p>Forgot Password? <a href="#">Click here</a></p>
            </div>
          </form>
        )}
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default Login;
