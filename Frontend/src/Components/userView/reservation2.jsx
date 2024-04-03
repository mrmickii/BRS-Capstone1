import React, { useState, useEffect } from 'react';
import Header from '../userView/header';
import SideNavBar from '../userView/sidenavbar';
import Calendar from '../userView/calendar';
import Preloader from '../userView/preloader';
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
import '../../CSS/userCSS/reservation2.css';
import { IoIosSend } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";

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
    reason: ''
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchReservationData();
    fetchDepartments();
  }, []);

  const fetchReservationData = async () => {
    try {
      const response = await fetch('http://localhost:8080/reservation/reservations');
      if (response.ok) {
        const data = await response.json();
        setFormValues(data);
        console.log('Success fetching reservation data.');
      } else {
        console.error('Failed to fetch reservation data.');
      }
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    } finally {
      setLoading(false);
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
      reason: ''
    });
    setSelectedDate(null);
  };

  const handleDepartmentChange = (e) => {
    setFormValues({ ...formValues, department: e.target.value });
  };

  const handleTripTypeChange = (e) => {
    setFormValues({ ...formValues, typeOfTrip: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/reservation/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        console.log('Reservation submitted successfully');
      } else {
        console.error('Failed to submit reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
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
            <h2><AiOutlineClockCircle size={32} style={{marginRight: '15px', marginBottom: '-7px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/>SELECT TIMEFRAME</h2>
          </div>
          <div className='timeframe'></div>
          <div className='resform'>
            <div className='restitle'>
              <h2><AiFillFileText  size={28} style={{marginRight: '10px', marginBottom: '-5px'}}/>RESERVATION FORM</h2>
            </div>
            <div className='oneway'>
              <input type="radio" id="oneway" name="tripType" value="One Way" onChange={handleTripTypeChange} />
              <label htmlFor="oneway"> One Way</label>
            </div>
            <div className='roundtrip'>
              <input type="radio" id="roundtrip" name="tripType" value="Round Trip" onChange={handleTripTypeChange} />
              <label htmlFor="roundtrip"> Round Trip</label>
            </div>
            <div className='to'>
              <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="to" 
                name="to"
                placeholder='To:'
                value={formValues.destinationTo}
                    onChange={(e) => setFormValues({...formValues, destinationTo: e.target.value})} 
              />
            </div>
            <div className='from'>
              <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="from" 
                name="from" 
                placeholder='From:'
                value={formValues.destinationFrom}
                    onChange={(e) => setFormValues({...formValues, destinationFrom: e.target.value})}
              />
            </div>
            <div className='capacity'>
              <BsPersonPlusFill size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px',padding: '5px' }}/>
              <input 
                type="text" 
                id="capacity" 
                name="capacity" 
                placeholder='Capacity'
                value={formValues.capacity}
                    onChange={(e) => setFormValues({...formValues, capacity: e.target.value})} 
              />
            </div>
            <div className='schedule'>
              <LuCalendarClock size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="schedule" 
                name="schedule" 
                placeholder='Schedule'
                value={selectedDate ? `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}` : ''}
                readOnly
              />
            </div>
            <div className='vehicle'>
              <FaBus size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="vehicle" 
                name="vehicle" 
                placeholder='Type of Vehicle'
                value={formValues.vehicleType}
                onChange={(e) => setFormValues({...formValues, vehicleType: e.target.value})} 
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
                placeholder='Pick up time'
                value={formValues.pickUpTime}
                onChange={(e) => setFormValues({...formValues, pickUpTime: e.target.value})} 
              />
            </div>
            <div className='departure'>
              <BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="departure" 
                name="departure" 
                placeholder='Departure time'
                value={formValues.departureTime}
                onChange={(e) => setFormValues({...formValues, departureTime: e.target.value})} 
              />
            </div>
            <div className='file-upload'>
              <label htmlFor="file-upload"> 
                <HiDocumentDownload  size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px', color:'#782324' }}/>
                Proof of Approval Request<br/>
                <p style={{fontSize: '12px', fontWeight: '500'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Note: this is optional</p>
              </label>
              <input type="file" id="file-upload" name="file" accept=".doc, .docx, .pdf" />
            </div>
            <div className='reason'>
              < AiFillMessage size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
              <input 
                type="text" 
                id="reason" 
                name="reason" 
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
              
            </div>
          </div>
          <div className='cit-bglogo'></div>
        </>
      )}
    </div>
  );
}

export default Reservation2;
