import React from "react";
import '../../CSS/opcCSS/opcSide.css'
import Header from '../userView/header'
import SideNavBar from '../opcView/sidenavbar'

const OpcSide = () =>{
  return(
    <div className="head-view-container">
      <Header />
      <SideNavBar />
      <div className="head-view-content-container">
        <div className="head-view-content">

          <div className="banner"></div>

          <div className="l-request">
            <h1>LIST OF REQUESTS</h1>
            <div className="department-selector">
              <p>Select Department:</p>
            </div>
          </div>

          <div className="r-content">
            {/* DIRI MASULOD ANG CONTENT IF APPROVE BA OR DILI */}
          </div>
        </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
}

export default OpcSide