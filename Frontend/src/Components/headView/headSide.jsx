import React, { useState, useEffect } from "react";
import '../../CSS/headCSS/headSide.css'
import Header from '../userView/header'
import SideNavBar from '../userView/sidenavbar'

const HeadSide = () => {

  const [reservations, setReservations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showFilteredReservations, setShowFilteredReservations] = useState(false);

  useEffect(() => {
    fetchReservations();
    fetchDepartments();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
        console.log('Success fetching reservation data.');
      } else {
        console.error('Failed to fetch reservation data.');
      }
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/department/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
        console.log('Success fetching department data.');
      } else {
        console.error('Failed to fetch department data.');
      }
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

  return(
    <>
    <Header />
    <SideNavBar />

    <div className="head-view-container">
      <div className="content-container">
        {/* TO BE DECIDED IF BUTANGAN UG BANNER OR DILI */}
        {/* <div className="head-banner-container"></div> */}
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
                <option value="0">-- Choose a Department --</option>
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
                  <button>View Attached File</button>
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
    </>
  );
}

export default HeadSide;
