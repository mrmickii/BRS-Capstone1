import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Preloader from '../userView/preloader';
import '../../CSS/userCSS/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth_login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setLoggedIn(true);
        const { role } = data;

        switch (role) {
          case 'STAFF':
            navigate('/staff_view');
            break;
          case 'USER':
            navigate('/user_view');
            break;
          case 'HEAD':
            navigate('/head_view');
            break;
          default:
            navigate('/');
            break;
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div className='main'>
      <div className='citlogo'></div>
      <div className='logincit-bglogo'></div>
      <div className='title'>
        <h1>TRANSPORTATION RESERVATION SYSTEM</h1>
      </div>
      <div className='parent-login'>
        <div className='login-container'>
          <h2>User Authentication</h2>
          {isLoading ? (
            <Preloader />
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
                <p>Forgot Password? <a href="/forgotpass">Click here</a></p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
