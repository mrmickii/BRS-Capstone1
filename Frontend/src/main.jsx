import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Components/userView/Login';
import Reservation2 from './Components/userView/Reservation2';
import Reservation from './Components/userView/Reservation';
import ManangeRequests from './Components/userView/ManageRequests'
import Settings from './Components/userView/Settings';
import ForgotPassword from './Components/userView/ForgotPassword';
import HeadView from './Components/headView/HeadSide';
import HeadViewRequests from './Components/headView/HeadViewRequests';
import HeadSettings from './Components/headView/HeadSettings';
import OpcSide from './Components/opcView/OpcSide';
import OpcDriver from './Components/opcView/OpcDriver';
import OpcSettings from './Components/opcView/OpcSettings';
import OpcApprovedRequests from './Components/opcView/OpcApprovedRequests';
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
      <Route path="/manage-requests" element={<ManangeRequests />} />
      <Route path="/head-view" element={<HeadView />} />
      <Route path="/head-view/settings" element={<HeadSettings />} /> 
      <Route path="/head-view/view-requests" element={<HeadViewRequests />} />
      <Route path="/opc-view/approved-requests" element={<OpcApprovedRequests />} />
      <Route path="/reservation" element={<Reservation />} /> 
      <Route path="/user-view" element={<Reservation2 />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/opc-vew/settings" element={<OpcSettings />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/staff-view" element={<OpcSide />} />
      <Route path="/driver-management" element={<OpcDriver/>} />
      <Route path="/vehicle-management" element={<OpcVehicle/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);