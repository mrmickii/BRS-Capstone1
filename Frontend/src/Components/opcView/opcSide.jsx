import React from "react";
import '../../CSS/opcCSS/opcSide.css'
import Header from '../userView/header'
import SideNavBar from '../opcView/sidenavbar'

const OpcSide = () =>{
  return(
    <div className="opc-view-container">
      <Header />
      <SideNavBar />
      <div className="opc-view-content-container">
        <div className="opc-view-content">

          <div className="banner"></div>         

          <div className="opc-content">
            {/* DIRI MASULOD ANG CONTENT IF APPROVE BA OR DILI */}
            <div className="request-container">
          <div className="opc-request">
            <h1>REQUESTS</h1>
            <div className="view-request">
              <button className="viewbut-color">
                View Approved Requests
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
}

export default OpcSide