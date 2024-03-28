import React, { useState } from 'react';
import Header from '../Components/header';
import SideNavBar from '../Components/sidenavbar';
import Calendar from '../Components/calendar';
import { LuCalendarClock } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { RiBuildingFill } from "react-icons/ri";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaBus } from "react-icons/fa";

import '../CSS/reservation2.css';

const Reservation2 = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="reservation">
      <Header />
      <SideNavBar />
      <div className='subheader'>
        <h2>RESERVATION</h2>
      </div>
      <div className='selectsched'>
        <h2><LuCalendarClock size={28} style={{marginRight: '15px', marginBottom: '-5px'}}/>SELECT SCHEDULE</h2>
      </div>
      <div className='calendar-div'>
        <Calendar onDateSelect={handleDateSelect} />
      </div>
      <div className='resform'>
        <div className='oneway'>
          <input type="radio" id="oneway" name="drone" value="oneway" checked />
          <label htmlFor="oneway"> One Way</label>
        </div>
        <div className='roundtrip'>
          <input type="radio" id="roundtrip" name="drone" value="roundtrip" checked />
          <label htmlFor="roundtrip"> Round Trip</label>
        </div>
        <div className='to'>
          <FaLocationDot size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
          <input 
            type="text" 
            id="to" 
            name="to"
            placeholder='To:' 
          />
        </div>
        <div className='from'>
          <FaLocationDot size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
          <input 
            type="text" 
            id="from" 
            name="from" 
            placeholder='From:' 
          />
        </div>
        <div className='capacity'>
          <BsPersonPlusFill size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
          <input 
            type="text" 
            id="capacity" 
            name="capacity" 
            placeholder='Capacity' 
          />
        </div>
        <div className='schedule'>
          <LuCalendarClock size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
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
          < FaBus size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
          <input 
            type="text" 
            id="vehicle" 
            name="vehicle" 
            placeholder='Type of Vehicle' 
          />
        </div>
        <div className='dropdown'>
          <RiBuildingFill size={20} style={{ marginRight: '10px', marginBottom: '-5px' }}/>
          <select id="category" name="category">
            <option value="" disabled selected>Select Department</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="firstclass">First Class</option>
          </select>
        </div>
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
}

export default Reservation2;
