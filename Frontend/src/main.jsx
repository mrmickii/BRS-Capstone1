import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/userView/login'
// import Reservation2 from './Components/userView/reservation2'
// import HeadSide from './Components/headView/headSide';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
