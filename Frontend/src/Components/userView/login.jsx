import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Preloader from '../userView/preloader';
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import '../../CSS/userCSS/login.css';
import { auth, db } from '../../firebaseConfig';
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
        
        const userType = await getUserTypeSomehow(user.uid);
        if (userType) {
          console.log("UserType:", userType);
          switch (userType) {
            case "head":
              navigate("/head_view");
              break;
            case "user":
              navigate("/user_view");
              break;
            case "staff":
              navigate("/staff_view");
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

  const getUserTypeSomehow = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists) {
        const userData = docSnap.data();
        return userData.userType;
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
  
      const userType = await getUserTypeSomehow(user.uid);
      if (userType) {
        switch (userType) {
          case "head":
            navigate("/head_view");
            break;
          case "user":
            navigate("/user_view");
            break;
          case "staff":
            navigate("/staff_view");
            break;
          default:
            navigate("/");
            break;
        }
      } else {
        navigate("/");
      }
  
      console.log("User successfully logged in:", user.email);
    } catch (error) {
      console.error("Login error:", error);
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
