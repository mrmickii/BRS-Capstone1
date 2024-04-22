import React from 'react';
import '../../CSS/opcCSS/modal.css'

function Modal({ onClose }){

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )

    return(
        <div className="modalBackground">
          <div className="modalContainer">
            <Button onClick={onClose}> X </Button>
            <div className="modaltitle">
              <h1>UPDATE REQUEST</h1>
            </div>
            <div className="subtitle">
              <p>EDUCATIONAL TOUR</p>
            </div>
            <form>
            <div className="body1-1">
              <input placeholder="Type of Trip"/>
            </div>
            <div className="body1-2">
              <input placeholder="From"/> 
            </div>
            <div className="body1-3">
              <input placeholder="To"/> 
            </div>
            <div className="body1-4">
              <input placeholder="Date"/>
            </div>
            <div className="body2-1">
              <input placeholder="Department"/>
            </div>
            <div className="body2-2">
              <input placeholder="Send Time"/>
            </div>
            <div className="body2-3">
              <input placeholder="Pick Up Time"/>
            </div>
            <div className="body3-1">
              <input placeholder="Type of Trip"/>
            </div>
            <div className="body3-2">
              <input placeholder="Vehicle"/>
            </div>
            <div className="body3-3">
              <input placeholder="Capacity"/>
            </div>
            <div className="body4-1">
              <input placeholder="Reason of Trip"/>
            </div>
            <button>SAVE CHANGES</button>
            </form>
          </div>
        </div>
    )
}

export default Modal;