import React, { useState } from "react";
import '../../CSS/opcCSS/opcSide.css'
import Header from '../userView/header'
import SideNavBar from '../opcView/sidenavbar'
import Modal from '../opcView/Modal'
import ApproveModal from "./approvemodal";

const OpcSide = () =>{

  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  
  const handleUpdateButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApproveButtonClick = () => {
    setShowApproveModal(true);
  };

  const handleCloseApproveModal = () => {
    setShowApproveModal(false);
  };
  return(
    <div className="opc-view-container">
      <Header />
      <SideNavBar />
      <div></div>
        <div className="opc-title">
          <h1 className="title-opc">REQUESTS</h1>
        </div>
        <div className="OPC-container opc-container-bg">
          <div className="opc-header-button">
              <div className="flex-1 p-4">
                <div className="flex space-x-4 mb-4">
                  <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                    <span className="ml-2">REQUESTS</span>
                    <span className="ml-2 bg-red-600 text-white p-1 rounded">02</span>
                  </div>
                  <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                    <span className="ml-2">DRIVERS</span>
                    <span className="ml-2 bg-red-600 text-white p-1 rounded">08</span>
                  </div>
                  <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                    <span className="ml-2">VEHICLES</span>
                    <span className="ml-2 bg-red-600 text-white p-1 rounded">12</span>
                  </div>
              </div>
              <button className="view-request-button">View Approved Request</button>
            <div className="bg-white p-4 rounded-lg shadow-md">
              
              <h2 className="text-xl font-bold mb-2">EDUCATIONAL TOUR</h2>
              <p>
                <strong>Requester name:</strong> Jeff Conson
              </p>
              <p>
                <strong>To:</strong> Cebu city <strong>From:</strong> CIT - U
              </p>
              <p>
                <strong>Type of Trip:</strong> Round Trip <strong>Capacity:</strong> 40
              </p>
              <p>
                <strong>Send time:</strong> 11:00 AM <strong>Pick up time:</strong> 4:30 PM
              </p>
              <p>
                <strong>Department:</strong> CCS Department <strong>Vehicle:</strong> Bus 1
              </p>
              <p>
                <strong>Date:</strong> 16/03/2024
              </p>
              <p>
                <strong>Reason:</strong> ICT Congress - Central Visayas
              </p>
              <div className="flex mt-4">
                <button  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleUpdateButtonClick}>
                  UPDATE  
                </button>
                {showModal && <Modal onClose={handleCloseModal} />}
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleApproveButtonClick}>
                  APPROVE
                </button>
                {showApproveModal && <ApproveModal onClose={handleCloseApproveModal} />}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-10 px-20 rounded">
                  REJECT
                </button>
                <button className="bg-maroon-500 hover:bg-yellow-700 text-white font-bold py-10 px-20 rounded">
                  VIEW FEEDBACK
                </button>
                <button className="bg-attach-500 hover:bg-yellow-700 text-maroon font-bold py-10 px-20 rounded">
                  VIEW ATTACHED FILE
                </button>  
            </div>
            
              <div className="opc-feedback">
                <form>
                  <br></br>
                  <div>
                    <input placeholder="send feedback (optional)" name="send feedback" />
                  </div>
                    <button className="bg-maroon-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Send</button>
                </form>
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