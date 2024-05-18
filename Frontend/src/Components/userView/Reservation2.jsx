import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNavBar from './SideNavBar';
import CalendarModal from './CalendarModal';
import Calendar from './Calendar';
import Preloader from './Preloader';
import { LuCalendarClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { RiBuildingFill } from "react-icons/ri";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";
import { HiDocumentDownload } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import '../../CSS/userCSS/reservation2.css';
import { app, auth } from "../../FirebaseConfig";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useLocation } from 'react-router-dom';

const db = getFirestore(app);
const storageRef = getStorage();

const Reservation2 = () => {
  const location = useLocation();
  const { vehicleType } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formValues, setFormValues] = useState({
    typeOfTrip: '',
    destinationTo: '',
    destinationFrom: '',
    capacity: '',
    department: '',
    schedule: '',
    vehicleType: vehicleType || '',
    pickUpTime: '',
    departureTime: '',
    reason: '',
    file: null,
    fileURL: null 
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    fetchDepartments();
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        const name = userEmail.split('@')[0].split('.').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setUserEmail(name);
        console.log('User Name:', name);
      }
    });
    return () => unsubscribe();
  }, []);

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
      setError('Error fetching department data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    console.log(date); 
    setSelectedDate(date);
    setIsModalOpen(false);
  };
  
  const handleDateConfirm = () => {
    console.log('Confirming schedule:', selectedDate); 
    setFormValues({...formValues, schedule: selectedDate});
  };

  const handleClearEntities = () => {
    setFormValues({
      typeOfTrip: '',
      destinationTo: '',
      destinationFrom: '',
      capacity: '',
      department: '',
      schedule: '',
      vehicleType: vehicleType || '',
      pickUpTime: '',
      departureTime: '',
      reason: '',
      file: null,
    });
    setSelectedDate(null);
  };
  
  const goBack = () => {
    window.history.back(); 
  };

  const handleDepartmentChange = (e) => {
    setFormValues({ ...formValues, department: e.target.value });
  };

  const handleTripTypeChange = (e) => {
    setFormValues({ ...formValues, typeOfTrip: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormValues({ ...formValues, file: selectedFile || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formValues.typeOfTrip ||
      !formValues.destinationTo ||
      !formValues.destinationFrom ||
      !formValues.capacity ||
      !formValues.department ||
      !selectedDate || 
      !formValues.vehicleType ||
      (!formValues.pickUpTime && formValues.typeOfTrip !== 'One Way') ||
      !formValues.departureTime ||
      !formValues.reason
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    const pickUpTime = formValues.typeOfTrip === 'One Way' ? 'N/A' : formValues.pickUpTime;
  
    const reservationData = {
      typeOfTrip: formValues.typeOfTrip,
      destinationTo: formValues.destinationTo,
      destinationFrom: formValues.destinationFrom,
      capacity: formValues.capacity,
      department: formValues.department,
      schedule: selectedDate, 
      vehicleType: formValues.vehicleType,
       pickUpTime: pickUpTime,
      departureTime: formValues.departureTime,
      reason: formValues.reason,
      userEmail: userEmail
    };
  
    const formData = new FormData();
    formData.append('reservation', JSON.stringify(reservationData));
    formData.append('userEmail', userEmail);
  
    if (formValues.file) {
      formData.append('file', formValues.file);
    }
  
    const confirmed = window.confirm('Are you sure you want to submit this reservation?');
    if (!confirmed) {
      return;
    }
    try {
      if (formValues.file) {
        const fileRef = ref(storageRef, formValues.file.name);
        await uploadBytes(fileRef, formValues.file);
      }
  
      const response = await fetch('http://localhost:8080/reservation/add', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }
  
      console.log('Reservation submitted successfully.');
      alert('Reservation submitted successfully.');
  
      setFormValues({
        typeOfTrip: '',
        destinationTo: '',
        destinationFrom: '',
        capacity: '',
        department: '',
        schedule: '',
        vehicleType: vehicleType || '',
        pickUpTime: '',
        departureTime: '',
        reason: '',
        file: null,
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setError('Failed to submit reservation.');
    }
  };

  const handleCapacityChange = (e) => {
    const value = parseInt(e.target.value, 10); 
    if (!isNaN(value) && value >= 0) {
      setFormValues({...formValues, capacity: value});
    }
  };
  
  return (
    <div className="reservation">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <SideNavBar />
          <div className='subheader'>
            <h2 style={{fontSize: '36px'}}>RESERVATION </h2>
          </div>
          <div className='backing'>
            <button onClick={goBack} className='back-win'><IoArrowBackCircle style={{marginRight: '10px', marginBottom: '-3px'}}/>Back to Select Vehicle</button>
            </div>
          <div className='resform'>
            <div className='restitle'>
              <h2><AiFillFileText  size={28} style={{marginRight: '10px', marginBottom: '-5px'}}/>RESERVATION FORM</h2>
            </div>
            <div className='oneway'>
              <input type="radio" id="oneway" name="tripType" value="One Way" onChange={handleTripTypeChange} required/>
              <label htmlFor="oneway"> One Way</label>
            </div>
            <div className='roundtrip'>
              <input type="radio" id="roundtrip" name="tripType" value="Round Trip" onChange={handleTripTypeChange} required/>
              <label htmlFor="roundtrip"> Round Trip</label>
            </div>
            <div className='to'>
              <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="to" 
                name="to"
                placeholder='To:'
                style={{fontSize: '14px'}} 
                value={formValues.destinationTo}
                onChange={(e) => setFormValues({...formValues, destinationTo: e.target.value})} 
                required
              />
            </div>
            <div className='from'>
              <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="from" 
                name="from"
                style={{fontSize: '14px'}} 
                placeholder='From:'
                value={formValues.destinationFrom}
                onChange={(e) => setFormValues({...formValues, destinationFrom: e.target.value})}
                required
              />
            </div>
            <div className='capacity'>
              <BsPersonPlusFill size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px',padding: '5px' }}/>
              <input 
                type="number" 
                id="capacity" 
                name="capacity" 
                style={{fontSize: '14px'}} 
                placeholder='Capacity'
                value={formValues.capacity}
                onChange={handleCapacityChange} 
              />
            </div>
            <div className='schedule'>
              <LuCalendarClock size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="schedule" 
                name="schedule"
                style={{fontSize: '14px'}}  
                placeholder='Schedule'
                value={selectedDate ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}` : ''}
                onClick={() => setIsModalOpen(true)}
                readOnly
                required
              />
            </div>
            <div className='vehicle'>
              <FaBus size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="vehicle" 
                name="vehicle" 
                style={{fontSize: '14px'}} 
                placeholder='Type of Vehicle'
                value={vehicleType}
                readOnly
                required
              />
            </div>
            <div className='dropdown'>
              <RiBuildingFill size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <select id="department" name="department" onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.name}>{department.name}</option>
                ))}
              </select>
            </div>
            <div className='pickup'>
                    <BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
                    {formValues.typeOfTrip === 'One Way' ? (
                      <input
                        className="pickupinput"
                        type="text"
                        id="pickup" 
                        name="pickup" 
                        value="N/A"
                        readOnly
                        disabled
                        style={{ width: '200px' }}
                      />
                    ) : (
                      <select
                        className="pickupselect"
                        id="pickup" 
                        name="pickup" 
                        value={formValues.pickUpTime}
                        onChange={(e) => setFormValues({...formValues, pickUpTime: e.target.value})} 
                        required
                      >
                        <option value="" disabled>Select Pick-up Time</option>
                        {Array.from({ length: 24 }).map((_, index) => {
                          const hour = index % 12 || 12;
                          const ampm = index < 12 ? 'AM' : 'PM';
                          const time = `${hour}:${index % 2 === 0 ? '00' : '30'} ${ampm}`;
                          return <option key={index} value={time}>{time}</option>;
                        })}
                      </select>
                    )}
                  </div>
            <div className='departure'>
              <BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <select 
                id="departure"
                className="departureselect" 
                name="departure"
                value={formValues.departureTime}
                onChange={(e) => setFormValues({...formValues, departureTime: e.target.value})} 
                required
              >
                <option value="" disabled>Select Departure Time</option>
                {Array.from({ length: 24 }).map((_, index) => {
                  const hour = index % 12 || 12;
                  const ampm = index < 12 ? 'AM' : 'PM';
                  const time = `${hour}:${index % 2 === 0 ? '00' : '30'} ${ampm}`;
                  return <option key={index} value={time}>{time}</option>;
                })}
              </select>
            </div>
            <div className='file-upload'>
              <label htmlFor="file-upload"> 
                <HiDocumentDownload  size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px', color:'#782324' }}/>
                Proof of Approval Request<br/>
                <p style={{fontSize: '12px', fontWeight: '500'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: this is optional</p>
              </label>
              <input style={{fontSize: '14px'}}  type="file" id="file-upload" name="file" accept=".doc, .docx, .pdf" onChange={handleFileChange}/>
            </div>
            <div className='reason'>
              < AiFillMessage size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="reason" 
                name="reason" 
                style={{fontSize: '14px'}} 
                placeholder='Reason of Reservation'
                value={formValues.reason}
                onChange={(e) => setFormValues({...formValues, reason: e.target.value})} 
              />
            </div>
            <div className='clearentitiies'>
              <button className='clear' onClick={handleClearEntities}><BsFillTrash3Fill style={{marginRight: '5px', marginBottom: '-2px'}}/>CLEAR ENTITIES</button>
            </div>
            <div className='sendreq'>
              <button className='sendreqbutton' onClick={handleSubmit}><IoIosSend style={{marginRight: '5px', marginBottom: '-2px'}}/>SEND REQUEST</button>
            </div>
            <CalendarModal show={isModalOpen} onClose={() => setIsModalOpen(false)} onDateConfirm={handleDateConfirm}>
              <Calendar onDateSelect={handleDateSelect} />
            </CalendarModal>

            <div className='summarylabel'>
              <h2>SUMMARY OF REQUEST</h2>
            </div>
            <div className='summary'>
              <table>
                <thead>
                  <tr>
                    <th>Type of Trip</th>
                    <th style={{width: '300px'}}>To</th>
                    <th style={{width: '300px'}}>From</th>
                    <th>Capacity</th>
                    <th>Schedule</th>
                    <th>Department</th>
                    <th>Type of Vehicle</th>
                    <th>Pick up Time</th>
                    <th>Departure Time</th>
                    <th>Reason of Reservation</th>
                    <th>File Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formValues.typeOfTrip}</td>
                    <td>{formValues.destinationTo}</td>
                    <td>{formValues.destinationFrom}</td>
                    <td>{formValues.capacity}</td>
                    <td>{selectedDate ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}` : ''}</td>
                    <td>{formValues.department}</td>
                    <td>{formValues.vehicleType}</td>
                    <td>{formValues.pickUpTime}</td>
                    <td>{formValues.departureTime}</td>
                    <td>{formValues.reason}</td>
                    <td>{formValues.file ? formValues.file.name : 'No file(s) attached'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='cit-bglogo'></div>
          <div className='cit-bglogo1'></div>
        </>
      )}
    </div>
  );
}

export default Reservation2;