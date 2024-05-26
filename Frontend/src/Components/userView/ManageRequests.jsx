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
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [departments, setDepartments] = useState([]);

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
      fetchDepartments();
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

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/department/departments');
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const departmentData = await response.json();
      console.log('Success fetching departments:', departmentData);
      setDepartments(departmentData);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartments([]);
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

  const handleUpdateClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
  };

  const handleUpdateReservation = async (updatedReservation, file) => {
    try {
      // Set the status back to "Pending"
      updatedReservation.status = "Pending";
      updatedReservation.rejected = 0;
  
      const formData = new FormData();
      formData.append('reservation', JSON.stringify(updatedReservation));
      if (file) {
        formData.append('file', file);
      }
  
      const response = await fetch(`http://localhost:8080/reservation/update/${updatedReservation.id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update reservation');
      }
  
      const updatedReservationData = await response.json();
      console.log('Updated reservation:', updatedReservationData);
  
      setReservations(reservations.map(reservation =>
        reservation.id === updatedReservationData.id ? updatedReservationData : reservation
      ));
  
      setShowModal(false);
    } catch (error) {
      console.error('Error updating reservation:', error);
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
                        <p>Assigned Driver: <span>{reservation.driverName ? reservation.driverName : 'No driver assigned'}</span></p>
                        <p>Feedback: <span>{reservation.feedback}</span></p>
                        <p className='urm-status'>Status: 
                          <span className={`${getStatusColor(reservation.status)}`}> {reservation.status}</span>
                        </p>
                      </div>
                      <div>
                        <h3 className='urm-header'>Vehicle: {reservation.vehicleType}</h3>
                        <p>Destination To: <span>{reservation.destinationTo}</span></p>
                        <p>Destination From: <span>{reservation.destinationFrom}</span></p>
                        <p>Departure Time: <span>{reservation.departureTime}</span></p>
                        <p>Pick-up Time: <span>{reservation.pickUpTime}</span></p>
                        <p>Reason: <span>{reservation.reason}</span></p>
                        {reservation.status === 'Rejected' && (
                          <button className='urm-update-btn' onClick={() => handleUpdateClick(reservation)}>Update</button>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
      {showModal && selectedReservation && (
        <UpdateModal 
          reservation={selectedReservation} 
          onClose={handleCloseModal} 
          onUpdate={handleUpdateReservation}
          departments={departments}
        />
      )}
      <div className='cit-bglogo'></div>
    </div>
  );
};

const UpdateModal = ({ reservation, onClose, onUpdate, departments }) => {
  const [updatedReservation, setUpdatedReservation] = useState({ ...reservation });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservation(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedReservation, file);
  };

  return (
    <div className="update-modal">
      <div className="modal-content">
        <h2 className="modal-content-h2">Resend Reservation
          <p className="close-btn" onClick={onClose}>x</p>
        </h2>
        
        <form onSubmit={handleSubmit}>
          <label>
            Type of Trip:
            <div className='radio-btn'>
              <label>
                <input 
                  type="checkbox" 
                  name="typeOfTrip" 
                  value="One Way" 
                  checked={updatedReservation.typeOfTrip === 'One Way'} 
                  onChange={handleChange} 
                />
                One Way
              </label>
              <label>
                <input 
                  type="checkbox" 
                  name="typeOfTrip" 
                  value="Round Trip" 
                  checked={updatedReservation.typeOfTrip === 'Round Trip'} 
                  onChange={handleChange} 
                />
                Round Trip
              </label>
            </div>
          </label>
          <label>
            Destination To:
            <input 
              type="text" 
              name="destinationTo" 
              value={updatedReservation.destinationTo} 
              onChange={handleChange}
            />
          </label>
          <label>
            Destination From:
            <input 
              type="text" 
              name="destinationFrom" 
              value={updatedReservation.destinationFrom} 
              onChange={handleChange}
            />
          </label>
          <label>
            Capacity:
            <input 
              type="number" 
              name="capacity" 
              value={updatedReservation.capacity} 
              onChange={handleChange}
            />
          </label>
          <label>
            Department:
            <select
              name="department"
              value={updatedReservation.department}
              onChange={handleChange}
            >
              {departments.map(department => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Schedule:
            <input 
              type="date" 
              name="schedule" 
              value={updatedReservation.schedule} 
              onChange={handleChange}
            />
          </label>
          <label>
            Vehicle:
            <input 
              type="text" 
              name="vehicleType" 
              value={updatedReservation.vehicleType} 
              onChange={handleChange}
            />
          </label>
          <label>
            Departure Time:
            <input 
              type="time" 
              name="departureTime" 
              value={updatedReservation.departureTime} 
              onChange={handleChange}
            />
          </label>
          <label>
            Pick-up Time:
            <input 
              type="time" 
              name="pickUpTime" 
              value={updatedReservation.pickUpTime} 
              onChange={handleChange}
            />
          </label>
          <label>
            Reason:
            <textarea 
              name="reason" 
              value={updatedReservation.reason} 
              onChange={handleChange}
              style={{
                resize: 'none',
                width: '300px',
                height: '70px',
                overflowY: 'auto'
              }}
            />
          </label>
          <label>
            Attach File:
            <input 
              type="file" 
              name="file" 
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Resend</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ManageRequests;
