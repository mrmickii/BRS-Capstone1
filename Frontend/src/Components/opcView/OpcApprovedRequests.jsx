import React, { useState, useEffect } from 'react';
import '../../CSS/opcCSS/opc-approved-requests.css';
import { BsBellFill } from "react-icons/bs";
import Header from '../userView/Header';
import OpcSideNavBar from './OpcSideNavBar';
import * as XLSX from 'xlsx';

const OpcApprovedRequests = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://localhost:8080/reservation/reservations`);
      if (!response.ok) {
        throw new Error('Failed to fetch reservation data');
      }
      const reservationData = await response.json();
      const filteredReservations = reservationData.filter(reservation => reservation.opcIsApproved);
      setReservations(filteredReservations);
      console.log('Success fetching reservation data.');
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(reservations);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, worksheet, 'Reservations');
    XLSX.writeFile(wb, 'reservations.xlsx');
  };

  return (
    <div className="opc-view-requests">
      <Header />
      <OpcSideNavBar />
      <div className="opc-view-requests-container">
        <div className="opc-view-requests-title">
          <h2 style={{color: 'white'}}>
            <BsBellFill size={25} style={{ marginRight: '20px', marginBottom: '-5px' }} />
            MANAGE REQUESTS
          </h2>
        </div>
        <div className='opc-reservation-list'>
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
                  <div className='export-btn'>
                    <button onClick={handleExport}>Export to Excel File</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Approved Reservations.</p>
          )}
        </div>
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default OpcApprovedRequests;