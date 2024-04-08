import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/userView/login';
import Reservation2 from './Components/userView/reservation2';
import Reservation from './Components/userView/reservation';
import Notification from './Components/userView/notification';
import HeadView from './Components/headView/headSide';
import OpcView from './Components/opcView/opcSide';
import Settings from './Components/userView/settings';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/head_view" element={<HeadView />} /> 
        <Route path="/staff_view" element={<OpcView />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/user_view" element={<Reservation2 />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
