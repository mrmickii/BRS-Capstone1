import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Reservation from './userView/reservation2';
import Notifications from './userView/notification';
import Settings from './userView/settings';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      {/* Add more routes here if needed */}
    </Routes>
  );
};

export default UserRoutes;
