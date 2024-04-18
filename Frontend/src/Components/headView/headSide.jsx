import React, { useState, useEffect } from "react";
import '../../CSS/headCSS/headSide.css';
import Header from '../userView/header';
import SideNavBar from '../headView/headnavbar';
import FileDialogBox from '../headView/dialogBox';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore();

const HeadSide = () => {
  const [reservations, setReservations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showFilteredReservations, setShowFilteredReservations] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showFileDialog, setShowFileDialog] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchDepartments();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservationsSnapshot = await getDocs(collection(db, 'reservations'));
      const reservationData = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(reservationData);
      console.log('Success fetching reservation data.');
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const departmentsSnapshot = await getDocs(collection(db, 'departments'));
      const departmentData = departmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDepartments(departmentData);
      console.log('Success fetching department data.');
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSetConfiguration = () => {
    setShowFilteredReservations(true);
    setFilteredReservations(reservations.filter(reservation => reservation.department === selectedDepartment));
  };

  const handleViewFile = (reservation) => {
    setSelectedReservation(reservation);
    setShowFileDialog(true); 
  };

  const handleCloseFileDialog = () => {
    setShowFileDialog(false);
  };

  return(
    <>
      <Header />
      <SideNavBar />
      <div className="head-view-container">
        <div className="content-container">
          <div className="dropdown-container">
            <div className="dropdown-h1">
              <h1>LIST OF REQUESTS</h1>
            </div>
            <div className="dropdown-selector">
              <p>Select Department:</p>
              <select 
                  name="selector" 
                  id="selector" 
                  value={selectedDepartment} 
                  onChange={handleDepartmentChange}
                >
                  <option value="">-- Choose a Department --</option>
                  {departments.map(department => (
                    <option key={department.id} value={department.name}>{department.name}</option>
                  ))}
                </select>
              <button onClick={handleSetConfiguration}>Search</button>
            </div>
          </div>
          <div className="data-container">
            {showFilteredReservations && filteredReservations.length > 0 ? (
              filteredReservations.map((reservation, index) => (
                <div className="request-data-container" key={index}>
                  <div className="r-d-container-left">
                    <h2>Type of Trip: {reservation.typeOfTrip}</h2>
                    <p>Capacity: {reservation.capacity}</p>
                    <p>Departure Time: {reservation.departureTime}</p>
                    <p>Destination To: {reservation.destinationTo}</p>
                    <div className="feedback-container">
                      <input type="text" placeholder="Send feedback (optional)"/>
                      <button>Send</button>
                    </div>
                    <h2>Vehicle Type: {reservation.vehicleType}</h2>
                    <p>Destination From: {reservation.destinationFrom}</p>
                    <p>Pick-up Time: {reservation.pickUpTime}</p>
                    <p>Reason: {reservation.reason}</p>
                  </div>
                  <div className="r-d-container-right">
                    <button>Approve</button>
                    <button>Reject</button>
                    <button>View Feedback</button>
                    <button onClick={() => handleViewFile(reservation)}>View Attached File</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-reservations-message">
                <p>No reservations for this department.</p>
              </div>
            )}
          </div>
        </div>
        <div className='cit-bglogo'></div>
      </div>
      {showFileDialog && <FileDialogBox onClose={handleCloseFileDialog} reservation={selectedReservation} />}
    </>
  );
}

export default HeadSide;
