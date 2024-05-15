import React from 'react';
import '../../CSS/userCSS/calendar-modal.css'; 
import { FaCalendarDay } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";

const CalendarModal = ({ show, onClose, onDateConfirm, children }) => {
  if (!show) {
    return null;
  }

  const handleConfirmSchedule = () => {
    onDateConfirm(); 
    onClose(); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}><IoIosCloseCircle size={32} style={{color: '#782324'}}/></button>
        <div className='subhead-modal'><FaCalendarDay style={{marginRight: '15px'}}/>SELECT SCHEDULE</div>
        {children}
      </div>
    </div>
  );
};

export default CalendarModal;
