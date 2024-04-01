import React from 'react'
import ReactDOM from 'react-dom/client';
import Login from './Components/userView/login'
import Reservation2 from './Components/userView/reservation2'
import Notification from './Components/userView/notification'
import HeadView from './Components/headView/headSide';
import OpcView from './Components/opcView/opcSide'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<Notification/>*/}
   {/* <Login />*/}
    {/* <HeadView /> */}
     <OpcView /> 
    {/*<Reservation2 /> */}
  </React.StrictMode>,
)
