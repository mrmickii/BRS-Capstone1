import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Components/userView/login';
import Reservation2 from './Components/userView/reservation2';
import Reservation from './Components/userView/reservation';
import Notification from './Components/userView/notification';
import HeadView from './Components/headView/headSide';
import HeadSettings from './Components/headView/headSettings';
import OpcView from './Components/opcView/opcSide';
import Settings from './Components/userView/settings';
import ForgotPass from './Components/userView/forgotpass';
import UserRequestMade from './Components/userView/userrequestsmade';
import { auth } from './firebaseConfig';
import OpcDriver from './Components/opcView/opcDriver';
import OpcVehicle from './Components/opcView/opcVehicle';

function App() {
  const navigate = useNavigate(); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userType = getUserTypeSomehow(); 
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
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/head_view" element={<HeadView />} />
      <Route path="/head_view/settings" element={<HeadSettings />} /> 
      <Route path="/staff_view" element={<OpcView />} />
      <Route path="/reservation" element={<Reservation />} /> 
      <Route path="/user_view" element={<Reservation2 />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/user_request_made" element={<UserRequestMade />} />
      <Route path="/forgotpass" element={<ForgotPass />} />
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