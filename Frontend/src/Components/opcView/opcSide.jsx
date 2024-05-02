import React, { useState, useEffect } from "react";
import Header from '../userView/header';
import SideNavBar from '../opcView/sidenavbar';
import '../../CSS/opcCSS/opcSide.css';
import Modal from '../opcView/Modal'
import ApproveModal from "../opcView/approvemodal";
import UpdatetModal from "../opcView/updateRequestModal";
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineUser, AiOutlineCar, AiOutlineFileText } from 'react-icons/ai';

const OpcSide = () => {
  const [reservations, setReservations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const navigate = useNavigate();

  const handleDriverManagement = () => {
    navigate('/driver-management');
  }

  const handleVehicleManagement = () => {
    navigate('/vehicle-management');
  }

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
 
  const handleRejectButtonClick = () => {
    setShowRejectModal(true);
  };
 
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
  };

  useEffect(() => {
    fetchReservations();
    fetchDepartments();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations');
      if (!response.ok) {
        throw new Error('Failed to fetch reservation data');
      }
      const reservationData = await response.json();
      setReservations(reservationData);
      console.log('Success fetching reservation data.');
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/department/departments');
      if (!response.ok) {
        throw new Error('Failed to fetch department data');
      }
      const departmentData = await response.json();
      setDepartments(departmentData);
      console.log('Success fetching department data.');
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleViewFile = (reservation) => {
    setSelectedReservation(reservation);
    setShowFileDialog(true);
  };

  return (
    <div className="opc-view-container">
      <Header />
      <SideNavBar />
      <div className="opc-title">
        <h1 className="title-opc">REQUESTS</h1>
      </div>
      <div className="data-container1">
      <div className="sample">
           <div className="opc-header-button-container">
                <div className="opc-header-button">
                    <button className="header-buttons"> <AiOutlineFileText size={20} style={{ marginLeft: '19px' }} /> Request <span class="number">1</span> </button>
                    <button className="header-buttons" onClick={handleDriverManagement}> <AiOutlineUser size={20} style={{ marginLeft: '37px' }} /> Driver <span class="number">1</span> </button>
                    <button className="header-buttons" onClick={handleVehicleManagement}> <AiOutlineCar size={20} style={{ marginLeft: '25px' }} /> Vehicle <span class="number">1</span> </button>
              </div>
            </div>
        <div className="opc-requests-header-container">
            <div className="opc-requests-header">
              <h1> <AiOutlineFileText size={35}/> REQUESTS</h1>
              <button>View Approve Request</button>
              </div> 
            </div> 
        {reservations.map((reservation, index) => (
          <div className="request-data-container1" key={index}>
            <div className="r-d-container-left1">
              <h2>Type of Trip: {reservation.typeOfTrip}</h2>
              <p>Capacity: {reservation.capacity}</p>
              <p>Departure Time: {reservation.departureTime}</p>
              <p>Destination To: {reservation.destinationTo}</p>
              <div className="feedback-container1">
                <input type="text" placeholder="Send feedback (optional)" />
                <button>Send Feedback</button>
              </div>
              <h2>Vehicle Type: {reservation.vehicleType}</h2>
              <p>Destination From: {reservation.destinationFrom}</p>
              <p>Pick-up Time: {reservation.pickUpTime}</p>
              <p>Reason: {reservation.reason}</p>
            </div>
            <div className="r-d-container-right1">
              <button onClick={handleApproveButtonClick}>
                  Approve
              </button> 
              {showApproveModal && <ApproveModal onClose={handleCloseApproveModal} />}

              <button onClick={handleRejectButtonClick}>
                  Reject
              </button>
              {showRejectModal && <RejectModal onClose={handleCloseRejectModal} />}

              <button onClick={handleUpdateButtonClick}>
                  Update
              </button>
              {showModal && <Modal onClose={handleCloseModal} />}

              <button>View Feedback</button>
              <button onClick={() => handleViewFile(reservation)}>View Attached File</button>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
};

export default OpcSide;
