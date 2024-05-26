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
      // Filter reservations based on userDepartment
      const filteredReservations = reservationData.filter(reservation => reservation.department === userDepartment);
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
            VIEW REQUESTS
          </h2>
        </div>
        <div className='reservation-list'>
          {reservations.length > 0 ? (
            <ul>
              {reservations.map((reservation, index) => (
                <li key={index}>
                  {/* Render reservation details here */}
                  <p>Type of Trip: {reservation.typeOfTrip}</p>
                  <p>Schedule: {reservation.schedule}</p>
                  <p>{reservation.department}</p>
                  {/* Add more details as needed */}
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
