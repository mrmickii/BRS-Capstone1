import React, { useState, useEffect } from "react";
import Header from '../userView/Header';
import HeadNavbar from "./HeadNavBar"; 
import FileDialogBox from './HeadViewFile';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import '../../CSS/headCSS/head-side.css';
import { auth } from "../../FirebaseConfig"; 

const db = getFirestore();

const HeadSide = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [userDepartment, setUserDepartment] = useState(null);

  useEffect(() => {
    fetchUserDepartment();
    fetchReservations();
  }, []);

  const fetchUserDepartment = async () => {
    try {
      const user = auth.currentUser; 
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); 
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const department = userData.department;
          setUserDepartment(department);
        } else {
          console.error('User document does not exist');
        }
      } else {
        console.error('No user signed in');
      }
    } catch (error) {
      console.error('Error fetching user department:', error);
    }
  };

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

  const handleViewFile = (reservation) => {
    setSelectedReservation(reservation);
    setShowFileDialog(true); 
  };

  const handleCloseFileDialog = () => {
    setShowFileDialog(false);
  };

  const filteredReservations = reservations.filter(reservation => reservation.department === userDepartment);

  return(
    <>
      <Header />
      <HeadNavbar />
      <div className="head-view-container">
        <div className="content-container">
          <div className="data-container">
            {filteredReservations.length > 0 ? (
              filteredReservations.map((reservation, index) => (
                <div className="request-data-container" key={index}>
                  <div className="r-d-container-left">
                    <h2>Type of Trip: {reservation.typeOfTrip}</h2>
                    <p>Capacity: {reservation.capacity}</p>
                    <p>Department: {reservation.department}</p>
                    <p>Departure Time: {reservation.departureTime}</p>
                    <div className="feedback-container">
                      <input type="text" placeholder="Send feedback (optional)"/>
                      <button>Send Feedback</button>
                    </div>
                    <h2>Vehicle Type: {reservation.vehicleType}</h2>
                    <p>Destination To: {reservation.destinationTo}</p>
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
                <p>No reservations for your department.</p>
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
