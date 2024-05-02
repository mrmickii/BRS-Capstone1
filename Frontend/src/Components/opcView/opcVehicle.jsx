import React from 'react';
import Header from '../userView/header';
import SideNavBar from '../opcView/sidenavbar';
import { AiOutlineEdit, AiOutlineUser, AiOutlineCar, AiOutlineFileText } from 'react-icons/ai';
import '../../CSS/opcCSS/opcSide.css';
import { useNavigate } from 'react-router-dom';

const OpcVehicle = () => {
  const navigate = useNavigate();

  const handleDriverManagement = () => {
    navigate('/driver-management');
  }

  const handleVehicleManagement = () => {
    navigate('/vehicle-management');
  }

  const handleRequest = () => {
    navigate('/staff_view');
  }

  return (
    <div className="opc-view-container">
      <Header />
      <SideNavBar />
      <div className="opc-title">
        <h1 className="title-opc">VEHICLES</h1>
      </div>
      <div className="data-container1">
      <div className="sample">
           <div className="opc-header-button-container">
                <div className="opc-header-button">
                    <button className="header-buttons"onClick={handleRequest}> <AiOutlineFileText size={20} style={{ marginLeft: '19px' }} /> Request <span class="number">1</span> </button>
                    <button className="header-buttons" onClick={handleDriverManagement}> <AiOutlineUser size={20} style={{ marginLeft: '37px' }} /> Driver <span class="number">1</span> </button>
                    <button className="header-buttons" onClick={handleVehicleManagement}> <AiOutlineCar size={20} style={{ marginLeft: '25px' }} /> Vehicle <span class="number">1</span> </button>
              </div>
            </div>
        <div className="opc-requests-header-container">
            <div className="opc-requests-header">
              <h1> <AiOutlineUser size={35}/> VEHICLES</h1>
              <button>Add Vehicle</button>
              </div> 
            </div> 
            </div> 
      <div className="bg-logo"></div>
    </div>
    </div> 
  );
}

export default OpcVehicle;