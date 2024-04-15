import React from "react";
import '../../CSS/opcCSS/opcSide.css'
import Header from '../userView/header'
import SideNavBar from '../opcView/sidenavbar'

const OpcSide = () =>{
  return(
    <div className="opc-view-container">
      <Header />
      <SideNavBar />

      <div className="flex space-x-4 mb-4 justify-start">
          <div className="flex-1 p-4">
            <h1 className="text-4xl font-bold mb-4">DASHBOARD</h1>
            <div className="flex space-x-4 mb-4">
              <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                <span className="material-icons">inbox</span>
                <span className="ml-2">REQUESTS</span>
                <span className="ml-2 bg-red-600 text-white p-1 rounded">02</span>
              </div>
              <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                <span className="material-icons">people</span> 
                <span className="ml-2">DRIVERS</span>
                <span className="ml-2 bg-red-600 text-white p-1 rounded">08</span>
              </div>
              <div className="bg-yellow-300 p-4 flex items-center rounded-lg">
                <span className="material-icons">directions_car</span>
                <span className="ml-2">VEHICLES</span>
                <span className="ml-2 bg-red-600 text-white p-1 rounded">12</span>
              </div>
            </div>

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
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                  UPDATE
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                  APPROVE
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  REJECT
                </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
}

export default OpcSide