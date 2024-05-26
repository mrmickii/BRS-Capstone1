import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import '../../CSS/userCSS/login.css';
import { auth, db } from '../../FirebaseConfig';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          navigateToDashboard(userData);
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
      return null;
    }
  };

  const navigateToDashboard = ({ userType, department }) => {
    switch (userType) {
      case "head":
        navigate("/head-view", { state: { department } });
        break;
      case "user":
        navigate("/reservation");
        break;
      case "staff":
        navigate("/staff-view");
        break;
      default:
        navigate("/");
        break;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      const userData = await getUserData(user.uid);
      if (userData) {
        navigateToDashboard(userData);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check email and password correctly.");
    } finally {
      setIsLoading(false);
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
            <form onSubmit={handleLogin}>
              <label>
                <FaUser />
                <input
                  type="text"
                  style={{ fontSize: '16px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  aria-label="Username"
                />
              </label>
              <label>
                <FaLock />
                <input
                  type="password"
                  style={{ fontSize: '16px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                />
              </label>
              {errorMessage && <p className="login-error-message">{errorMessage}</p>}
              <button className='login-btn' type="submit">
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
