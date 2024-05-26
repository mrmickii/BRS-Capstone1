import React, { useState, useEffect } from 'react';
import '../../CSS/userCSS/manage-requests.css';
import { BsBellFill } from "react-icons/bs";
import Header from './Header';
import SideNavBar from './SideNavBar';
import { auth } from "../../FirebaseConfig";

const ManageRequests = () => {
  const [reservations, setReservations] = useState([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userName = user.email;
        const name = userName.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setUserName(name);
        console.log('User Name:', name);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userName) {
      fetchUserReservations();
    }
  }, [userName]);

  const fetchUserReservations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservation/reservations/user/${userName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user reservations');
      }
      const userReservationData = await response.json();
      console.log('Success fetching user reservations:', userReservationData);
      setReservations(userReservationData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      setReservations([]);
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'approved';
      case 'Pending':
        return 'pending';
      case 'Rejected':
        return 'rejected';
      default:
        return '';
    }
  };

  return (
    <div className="manage-requests">
      <Header />
      <SideNavBar />
      <div className="manage-requests-container">
        <div className="manage-requests-title">
          <h2 style={{ color: 'white' }}>
            <BsBellFill size={25} style={{ marginRight: '20px', marginBottom: '-5px' }} />
            MANAGE REQUESTS
          </h2>
        </div>
        <div className='manage-requests-data'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {reservations.length === 0 ? (
                <p>No reservations found.</p>
              ) : (
                reservations.map(reservation => (
                  <li className="urm-li" key={reservation.id}>
                    <div className='user-reservation-made'>
                      <div>
                        <h3 className='urm-header'>Type of Trip: {reservation.typeOfTrip}</h3>
                        <p>Schedule: <span>{reservation.schedule}</span></p>
                        <p>Department: <span>{reservation.department}</span></p>
                        <p>Capacity: <span>{reservation.capacity}</span></p>
                        <p>Feedback: {reservation.feedback}</p>
                        <p className='urm-status'>Status: 
                          <span className={`${getStatusColor(reservation.status)}`}> {reservation.status}</span>
                        </p>
                        <p>Assigned Driver: {reservation.driverName}</p>
                      </div>
                      <div>
                        <h3 className='urm-header'>Vehicle: {reservation.vehicleType}</h3>
                        <p>Destination To: <span>{reservation.destinationTo}</span></p>
                        <p>Destination From: <span>{reservation.destinationFrom}</span></p>
                        <p>Departure Time: <span>{reservation.departureTime}</span></p>
                        <p>Pick-up Time: <span>{reservation.pickUpTime}</span></p>
                        <p>Reason: <span>{reservation.reason}</span></p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default ManageRequests;
