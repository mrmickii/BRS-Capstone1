import React from 'react';
import '../../CSS/opcCSS/modal.css'

function Modal({ onClose }) {

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )

  return (
    <div className="modalBackground">
      <div className="modalContainer">
          <button className="closeButton" onClick={onClose}>X</button>
            <div className="modalHeader">
              <h1>UPDATE REQUEST</h1>
              <p className="subtitle">EDUCATIONAL TOUR</p>
            </div>
            <form>
                <div className="formRow grid grid-cols-4 gap-4">
                  <input placeholder="Type of Trip"/>
                  <input placeholder="From"/> 
                  <input placeholder="To"/> 
                  <input placeholder="Date"/>
                </div>
                <div className="formRow grid grid-cols-3 gap-4">
                  <input placeholder="Department"/>
                  <input placeholder="Send Time"/>
                  <input placeholder="Pick-Up Time"/>
                </div>
                <div className="formRow grid grid-cols-4 gap-4">
                  <input placeholder="Pick-up point"/>
                  <input placeholder="Drop-off point"/>
                  <input placeholder="Vehicle"/>
                  <input placeholder="Capacity"/>
                </div>
                <div className="formRow">
                  <input placeholder="Reason of Trip"/>
                </div>
                <div className="opc-save-container">
                  <button className='opc-save-button'>SAVE CHANGES</button>
                </div>
              </form>
        </div>
    </div>
  )
}

export default Modal;
