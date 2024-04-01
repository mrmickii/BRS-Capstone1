import React from 'react'
import ReactDOM from 'react-dom/client';
import Login from './Components/userView/login'
import Reservation2 from './Components/userView/reservation2'
import Reservation from './Components/userView/reservation'
import Notification from './Components/userView/notification'
import HeadView from './Components/headView/headSide';
import Settings from './Components/userView/settings'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Notification/> */}
    {/* <Login /> */}
    {/* <HeadView /> */}
    <Reservation2 /> 
    {/* <Reservation />  */}
    {/* <Settings /> */}
  </React.StrictMode>,
)
