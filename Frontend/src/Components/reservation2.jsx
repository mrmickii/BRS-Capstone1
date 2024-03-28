import React, { useState } from 'react';
import Header from '../Components/header';
import SideNavBar from '../Components/sidenavbar';
import Calendar from '../Components/calendar';
import Preloader from '../Components/preloader';
import { LuCalendarClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { RiBuildingFill } from "react-icons/ri";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { HiDocumentDownload } from "react-icons/hi";import '../CSS/reservation2.css';

const Reservation2 = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  setTimeout(() => {
    setLoading(false);
  }, 5000);

  
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
          <div className='selectsched'>
            <h2><LuCalendarClock size={32} style={{marginRight: '15px', marginBottom: '-7px', background: '#782324', borderRadius: '50px', padding: '5px', color: 'white'}}/>SELECT SCHEDULE</h2>
          </div>
          <div className='calendar-div'>
            <Calendar onDateSelect={handleDateSelect} />
          </div>
          <div className='resform'>
            <div className='restitle'>
              <h2><AiFillFileText  size={28} style={{marginRight: '10px', marginBottom: '-5px'}}/>RESERVATION FORM</h2>
            </div>
            <div className='oneway'>
              <input type="radio" id="oneway" name="drone" value="oneway" />
              <label htmlFor="oneway"> One Way</label>
            </div>
            <div className='roundtrip'>
              <input type="radio" id="roundtrip" name="drone" value="roundtrip" />
              <label htmlFor="roundtrip"> Round Trip</label>
            </div>
        <div className='to'>
          <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <input 
            type="text" 
            id="to" 
            name="to"
            placeholder='To:' 
          />
        </div>
        <div className='from'>
          <FaLocationDot size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <input 
            type="text" 
            id="from" 
            name="from" 
            placeholder='From:' 
          />
        </div>
        <div className='capacity'>
          <BsPersonPlusFill size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px',padding: '5px' }}/>
          <input 
            type="text" 
            id="capacity" 
            name="capacity" 
            placeholder='Capacity' 
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
          < FaBus size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <input 
            type="text" 
            id="vehicle" 
            name="vehicle" 
            placeholder='Type of Vehicle' 
          />
        </div>
        <div className='dropdown'>
          <RiBuildingFill size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <select id="category" name="category">
            <option value="" disabled selected>Select Department</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="firstclass">First Class</option>
          </select>
        </div>
        <div className='pickup'>
          < BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <input 
            type="text" 
            id="pickup" 
            name="pickup" 
            placeholder='Pick up time' 
          />
        </div>
        <div className='departure'>
          < BiSolidTimeFive size={25} style={{ marginRight: '10px', marginBottom: '-5px', background: 'white', borderRadius: '50px', padding: '5px' }}/>
          <input 
            type="text" 
            id="departure" 
            name="departure" 
            placeholder='Departure time' 
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
          />
        </div>
      </div>
      
      <div className='cit-bglogo'></div>
      </>
      )}
    </div>
  );
}

export default Reservation2;
