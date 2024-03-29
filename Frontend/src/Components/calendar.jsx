import React, { useState } from 'react';
import '../CSS/calendar.css';

const Calendar = ({ onDateSelect }) => {
  // Get current date
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [currentDay] = useState(currentDate.getDate());
  const [selectedDay, setSelectedDay] = useState(currentDay); // Set current day as default selected

  // Function to move to the previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Function to move to the next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Function to get the number of days in a month
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate days for the current month
  const generateDays = () => {
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];

    // Fill the days before the current month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', selected: false });
    }

    // Fill the days of the current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({ day: i, selected: selectedDay === i });
    }

    return days;
  };

  // Handle click on a day
  const handleDayClick = (day) => {
    setSelectedDay(day);
    onDateSelect(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button onClick={prevMonth}>&lt;&lt;</button>
        <div className="calendar-month">{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        <button onClick={nextMonth}>&gt;&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-name">{day}</div>
        ))}
        {generateDays().map((item, index) => (
          <div key={index} className={`calendar-day${item.selected ? ' active' : ''}`} onClick={() => handleDayClick(item.day)}>
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
