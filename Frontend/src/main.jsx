import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Components/userView/Login';
import Reservation2 from './Components/userView/Reservation2';
import Reservation from './Components/userView/Reservation';
import Notification from './Components/userView/Notification';
import HeadView from './Components/headView/HeadSide';
import HeadNotification from './Components/headView/HeadNotification';
import HeadSettings from './Components/headView/HeadSettings';
import Settings from './Components/userView/Settings';
import ForgotPassword from './Components/userView/ForgotPassword';
import UserRequestMade from './Components/userView/UserRequestMade';
import OpcView from './Components/opcView/OpcSide';
import OpcDriver from './Components/opcView/OpcDriver';
import OpcVehicle from './Components/opcView/OpcVehicle';
import { auth } from './FirebaseConfig';

function App() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userType = getUserTypeSomehow(); 
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
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/head-view" element={<HeadView />} />
      <Route path="/head-view/settings" element={<HeadSettings />} /> 
      <Route path="/head-view/notification" element={<HeadNotification />} />
      <Route path="/reservation" element={<Reservation />} /> 
      <Route path="/user-view" element={<Reservation2 />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/user-request-made" element={<UserRequestMade />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/staff-view" element={<OpcView />} />
      <Route path="/driver-management" element={<OpcDriver/>} />
      <Route path="/vehicle-management" element={<OpcVehicle/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);