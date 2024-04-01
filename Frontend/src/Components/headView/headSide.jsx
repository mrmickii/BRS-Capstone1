import React from "react";
import '../../CSS/headCSS/headSide.css'
import Header from '../userView/header'
import SideNavBar from '../userView/sidenavbar'

const HeadSide = () =>{
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
              <select name="selector" id="selector">
                <option value="0">--Choose a Department--</option>
                <option value="1">College of Computer Studies (CCS) </option>
                <option value="1">College of Nursing and Allied Health Sciences(CNAHS) </option>
                <option value="1">College of Engineering and Architecture(CEA) </option>
              </select>
              <button>Set Configuration</button>
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

export default HeadSide