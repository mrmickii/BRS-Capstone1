import React, { useState, useEffect } from 'react';
import Header from './Header';
import SideNavBar from './SideNavBar';
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
import { AiOutlineClockCircle } from "react-icons/ai";
import '../../CSS/userCSS/reservation2.css';
import { app } from "../../FirebaseConfig";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const db = getFirestore(app);
const storageRef = getStorage();

const Reservation2 = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formValues, setFormValues] = useState({
    typeOfTrip: '',
    destinationTo: '',
    destinationFrom: '',
    capacity: '',
    department: '',
    schedule: '',
    vehicleType: '',
    pickUpTime: '',
    departureTime: '',
    reason: '',
    file: null,
    fileURL: null 
  });
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartments();
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
    setSelectedDate(date);
    setFormValues({...formValues, schedule: date});
  };

  const handleClearEntities = () => {
    setFormValues({
      typeOfTrip: '',
      destinationTo: '',
      destinationFrom: '',
      capacity: '',
      department: '',
      schedule: '',
      vehicleType: '',
      pickUpTime: '',
      departureTime: '',
      reason: '',
      file: null
    });
    setSelectedDate(null);
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
      !formValues.schedule ||
      !formValues.vehicleType ||
      !formValues.pickUpTime ||
      !formValues.departureTime ||
      !formValues.reason
    ) {
      alert('Please fill in all required fields.');
      return;
    }
  
    const reservationData = {
      typeOfTrip: formValues.typeOfTrip,
      destinationTo: formValues.destinationTo,
      destinationFrom: formValues.destinationFrom,
      capacity: formValues.capacity,
      department: formValues.department,
      schedule: formValues.schedule,
      vehicleType: formValues.vehicleType,
      pickUpTime: formValues.pickUpTime,
      departureTime: formValues.departureTime,
      reason: formValues.reason,
    };
  
    const formData = new FormData();
    formData.append('reservation', JSON.stringify(reservationData));
    if (formValues.file) {
      formData.append('file', formValues.file);
    }
  
    const confirmed = window.confirm('Are you sure you want to submit this reservation?');
    if (!confirmed) {
      return;
    }
  
    try {
      const fileRef = ref(storageRef, formValues.file.name);
      await uploadBytes(fileRef, formValues.file);
  
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
        vehicleType: '',
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
            <h2>RESERVATION</h2>
          </div>
          <div className='cit-banner'></div>
          <div className='color-yellow-palete'></div>
          <div className='color-red-palete'></div>
          <div className='color-gray-palete'></div>
          <div className='color-black-palete'></div>
          <div className='selectsched'>
            <h2><LuCalendarClock size={32} style={{marginRight: '15px', marginBottom: '-7px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/>SELECT SCHEDULE</h2>
          </div>
          <div className='calendar-div'>
            <Calendar onDateSelect={handleDateSelect} />
          </div>
          <div className='selecttime'>
            <h2><AiOutlineClockCircle size={32} style={{marginRight: '15px', marginBottom: '-7px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/>SELECT AVAILABLE TIMEFRAME</h2>
          </div>
          <div className='timeframe'>
          <div className="pick-pick-container">
          <BiSolidTimeFive size={25} style={{marginLeft: '10px', marginRight: '10px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/> 
              <h4>Select Pick-Up Time</h4>
              <br/>
              <select 
                id="pickup" 
                name="pickup" 
                style={{ position: 'absolute', top: '55px', left: '55px', width: '190px'}}
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
            </div>

            <div className="pick-depart-container" style={{marginTop: '60px'}}>
            <BiSolidTimeFive size={25} style={{marginLeft: '10px', marginRight: '10px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/>
              <h4>Select Departure Time</h4>
              <select 
                id="departure" 
                name="departure"
                style={{position: 'absolute', top: '140px', left: '55px'}} 
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
                value={formValues.vehicleType}
                onChange={(e) => setFormValues({...formValues, vehicleType: e.target.value})} 
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
              <input 
                type="text" 
                id="pickup" 
                name="pickup" 
                style={{fontSize: '14px'}} 
                placeholder='Pick up time'
                value={formValues.pickUpTime}
                onChange={(e) => setFormValues({...formValues, pickUpTime: e.target.value})}
                readOnly 
                required
              />
            </div>
            <div className='departure'>
              <BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="departure" 
                name="departure" 
                placeholder='Departure time'
                style={{fontSize: '14px'}} 
                value={formValues.departureTime}
                onChange={(e) => setFormValues({...formValues, departureTime: e.target.value})}
                readOnly 
                required
              />
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
        </>
      )}
    </div>
  );
}

export default Reservation2;
