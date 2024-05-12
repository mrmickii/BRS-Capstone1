import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Preloader from './PreLoader';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import '../../CSS/userCSS/login.css';
import { auth, db } from '../../FirebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        console.log("User:", user.email);
        
        const userData = await getUserData(user.uid);
        if (userData) {
          console.log("UserData:", userData);
          const { userType, department } = userData;
          switch (userType) {
            case "head":
              navigate("/head-view");
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
    
      if (docSnap.exists) {
        const userData = docSnap.data();
        return userData;
      } else {
        console.log("User document not found in Firestore");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log("Attempting login...");
  
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
  
      console.log("User authenticated:", user);
  
      const userData = await getUserData(user.uid);
      if (userData) {
        const { userType, department } = userData;
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
  
        if (department) {
          console.log("User Department:", department);
        }
      } else {
        navigate("/");
      }
  
      console.log("User successfully logged in:", user.email);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check email and password correctly.");
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
            <form>
              <label>
                <FaUser />
                <input
                  type="text"
                  style ={{fontSize: '16px'}}
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
                  style ={{fontSize: '16px'}}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </label>
              <button className='login-btn' type="submit" onClick={handleLogin}>
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
