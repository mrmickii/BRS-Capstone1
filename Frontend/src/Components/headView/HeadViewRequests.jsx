import React, { useState, useEffect } from 'react';
import '../../CSS/headCSS/head-view-requests.css';
import { BsBellFill } from "react-icons/bs";
import Header from '../userView/Header';
import HeadNavBar from './HeadNavBar';
import { auth } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore();

const HeadViewRequests = () => {
  const [reservations, setReservations] = useState([]);
  const [userDepartment, setUserDepartment] = useState('');

  useEffect(() => {
    fetchUserDepartment();
  }, []);

  useEffect(() => {
    if (userDepartment) {
      fetchReservations();
    }
  }, [userDepartment]);

  const fetchUserDepartment = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user signed in');
      }

      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        throw new Error('User document does not exist');
      }

      const userData = userDocSnap.data();
      setUserDepartment(userData.department);
    } catch (error) {
      console.error('Error fetching user department:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservation/reservations`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservation data');
      }
      const reservationData = await response.json();
      const filteredReservations = reservationData.filter(reservation => reservation.department === userDepartment && reservation.headIsApproved);
      setReservations(filteredReservations);
      console.log('Success fetching reservation data.');
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  return (
    <div className="head-view-requests">
      <Header />
      <HeadNavBar />
      <div className="head-view-requests-container">
        <div className="head-view-requests-title">
          <h2 style={{color: 'white'}}>
            <BsBellFill size={25} style={{ marginRight: '20px', marginBottom: '-5px' }} />
            APPROVED REQUESTS
          </h2>
        </div>
        <div className='reservation-list'>
          {reservations.length > 0 ? (
            <ul>
              {reservations.map((reservation, index) => (
                <li key={index}>
                  <div>
                    <h2 className="rdc-h2">Type of Trip: {reservation.typeOfTrip}</h2>
                    <p>Schedule: <span>{reservation.schedule}</span></p>
                    <p>Requestor: <span>{reservation.userName}</span></p>
                    <p>Department: <span>{reservation.department}</span></p>
                    <p>Capacity: <span>{reservation.capacity}</span></p>
                  </div>
                  <div>
                    <h2 className="rdc-h2">Vehicle Type: {reservation.vehicleType}</h2>
                    <p>Destination To: <span>{reservation.destinationTo}</span></p>
                    <p>Destination From: <span>{reservation.destinationFrom}</span></p>
                    <p>Departure Time: <span>{reservation.departureTime}</span></p>
                    <p>Pick-up Time: <span>{reservation.pickUpTime}</span></p>
                    <p>Reason: <span>{reservation.reason}</span></p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations available for {userDepartment} department.</p>
          )}
        </div>
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default HeadViewRequests;
