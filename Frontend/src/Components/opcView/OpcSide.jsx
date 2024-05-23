  import React, { useState, useEffect } from "react";
  import Header from '../userView/Header';
  import OpcNavBar from './OpcSideNavBar';
  import FileDialogBox from '../headView/HeadViewFile';
  import '../../CSS/opcCSS/opc-side.css';
  import { useNavigate } from 'react-router-dom';
  import { AiOutlineUser, AiOutlineFileText } from 'react-icons/ai';
  import { FaBus } from "react-icons/fa";
  import ConfirmationDialog from '../headView/ConfirmationDialog';

  const OpcSide = () => {
    const navigate = useNavigate();
    const [approvedReservations, setApprovedReservations] = useState([]);
    const [filteredApprovedReservations, setFilteredApprovedReservations] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [showFileDialog, setShowFileDialog] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [confirmationData, setConfirmationData] = useState({
      isOpen: false,
      action: '',
      reservationId: null,
    });

    const handleDriverManagement = () => {
      navigate('/driver-management');
    };

    const handleVehicleManagement = () => {
      navigate('/vehicle-management');
    };

    const handleViewFile = (reservation) => {
      setSelectedReservation(reservation);
      setShowFileDialog(true);
    };

    useEffect(() => {
      fetchApprovedReservations();
      fetchDrivers();
      fetchVehicles(); 
    }, []);

    useEffect(() => {
      const filtered = approvedReservations.filter(reservation => !reservation.opcIsApproved && reservation.headIsApproved && !reservation.rejected);
      setFilteredApprovedReservations(filtered);
    }, [approvedReservations]);

    const fetchApprovedReservations = async () => {
      try {
        const response = await fetch('http://localhost:8080/reservation/reservations/head-approved');
        if (!response.ok) {
          throw new Error('Failed to fetch approved reservation data');
        }
        const approvedReservationData = await response.json();
        setApprovedReservations(approvedReservationData);
        console.log('Success fetching approved reservation data.');
      } catch (error) {
        console.error('Error fetching approved reservation data:', error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:8080/driver/drivers');
        if (!response.ok) {
          throw new Error('Failed to fetch driver data');
        }
        const driverData = await response.json();
        setDrivers(driverData);
        console.log('Success fetching driver data.');
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/vehicle/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const vehicleData = await response.json();
        setVehicles(vehicleData);
        console.log('Success fetching vehicle data.');
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    const handleApprove = (reservationId) => {
      setConfirmationData({
        isOpen: true,
        action: 'approve',
        reservationId: reservationId,
      });
    };

    const handleReject = (reservationId) => {
      setConfirmationData({
        isOpen: true,
        action: 'reject',
        reservationId: reservationId,
      });
    };

    const handleCloseConfirmation = () => {
      setConfirmationData({
        isOpen: false,
        action: '',
        reservationId: null,
      });
    };

    const confirmAction = async () => {
      if (confirmationData.action === 'approve') {
        await handleApproveAction(confirmationData.reservationId);
      } else if (confirmationData.action === 'reject') {
        await handleRejectAction(confirmationData.reservationId);
      }
      handleCloseConfirmation();
    };

    const handleApproveAction = async (reservationId) => {
      try {
        const response = await fetch(`http://localhost:8080/reservation/opc-approve/${reservationId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to approve reservation');
        }
        const updatedReservations = approvedReservations.map(reservation => {
          if (reservation.id === reservationId) {
            return { ...reservation, isApproved: true };
          }
          return reservation;
        });
        setApprovedReservations(updatedReservations);
        console.log('Reservation approved successfully.');
        window.location.reload();
      } catch (error) {
        console.error('Error approving reservation:', error);
      }
    };
    
    const handleRejectAction = async (reservationId) => {
      try {
        const response = await fetch(`http://localhost:8080/reservation/reject/${reservationId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to reject reservation');
        }
        const updatedReservations = approvedReservations.map(reservation => {
          if (reservation.id === reservationId) {
            return { ...reservation, isRejected: true };
          }
          return reservation;
        });
        setApprovedReservations(updatedReservations);
        console.log('Reservation rejected successfully.');
        window.location.reload();
      } catch (error) {
        console.error('Error rejecting reservation:', error);
      }
    };
    

    return (
      <div className="opc-view-container">
        <Header />
        <OpcNavBar />
        <div className="opc-title" style={{marginBottom: '30px'}}>
          <h1 style={{fontSize: '46px'}}>REQUESTS</h1>
        </div>
        <div className="opc-data-container1">
          <div className="sample">
            <div className="opc-header-button-container">
              <div className="opc-header-button">
                <button id="request-button" className="header-buttons">
                  <AiOutlineFileText size={40} style={{ marginLeft: '19px' }} /> REQUEST <span className="number">{filteredApprovedReservations.length}</span>
                </button>
                <button id="driver-button" className="header-buttons" onClick={handleDriverManagement}>
                  <AiOutlineUser size={40} style={{ marginLeft: '37px' }} /> DRIVER <span className="number">{drivers.length}</span>
                </button>
                <button id="vehicle-button" className="header-buttons" onClick={handleVehicleManagement}>
                  <FaBus size={40}  style={{ marginLeft: '25px' }} /> VEHICLE <span className="number">{vehicles.length}</span>
                </button>
              </div>
            </div>
            <div className="opc-requests-header-container">
              <div className="opc-main-requests-header">
                <h1> <AiOutlineFileText size={32} style={{ marginRight: '10px' }}/> REQUESTS</h1>
                <button>View Approved Requests</button>
              </div>
            </div> 
            <div className="rdc-box">
              {filteredApprovedReservations.map((reservation, index) => (
                <div className="request-main-data-container1" key={index}>
                  <div className="r-d-container-left1">
                    <h2 className="rdc-h2">Type of Trip: {reservation.typeOfTrip}</h2>
                    <p>Schedule: <span>{reservation.schedule}</span></p>
                    <p>Requestor: <span>{reservation.userName}</span></p>
                    <p>Department: <span>{reservation.department}</span></p>
                    <p>Capacity: <span>{reservation.capacity}</span></p>
                    <div className="feedback-container1">
                      <input type="text" placeholder="Send feedback (optional)" />
                      <button>Send Feedback</button>
                    </div>
                    <h2 className="rdc-h2">Vehicle Type: {reservation.vehicleType}</h2>
                    <p>Destination To: <span>{reservation.destinationTo}</span></p>
                    <p>Destination From: <span>{reservation.destinationFrom}</span></p>
                    <p>Departure Time: <span>{reservation.departureTime}</span></p>
                    <p>Pick-up Time: <span>{reservation.pickUpTime}</span></p>
                    <p>Reason: <span>{reservation.reason}</span></p>
                  </div>
                  <div className="r-d-container-right1">
                    <button onClick={() => handleApprove(reservation.id)}>Accept</button>
                    <button onClick={() => handleReject(reservation.id)}>Reject</button>
                    <button onClick={() => handleViewFile(reservation)}>View Attached File</button>
                    <button>View Feedback</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='cit-bglogo'></div>
        {showFileDialog && <FileDialogBox onClose={() => setShowFileDialog(false)} reservation={selectedReservation} />}
        {confirmationData.isOpen && (
          <ConfirmationDialog
            action={confirmationData.action}
            onConfirm={confirmAction}
            onCancel={handleCloseConfirmation}
          />
        )}
      </div>
    );
  };
  
  export default OpcSide;
  
