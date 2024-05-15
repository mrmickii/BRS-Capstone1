import React from 'react';
import '../../CSS/opcCSS/modal.css';

function ApproveModal({ onClose }) {

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );

  return (
    <div className="approvemodalBackground">
      <div className="approvemodalContainer">
        <div className="approve-exit">
        <Button onClick={onClose}> X </Button>
        </div>
        <div className="approvetitle">
          <h2>Are you sure to approve the request?</h2>
        </div>
        <form>
          <div>
            <p>EDUCATIONAL TOUR</p>
            <br></br>
          </div>
          <div className="assign-driver">
            <input placeholder="Assign Driver"/> 
          </div>
          <div className="approve-modal-button">
          <button  className="approve-modal-button-cancel" type="button" onClick={onClose}>CANCEL</button>
          <button className="approve-modal-button-save" type="submit">SAVE CHANGES</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApproveModal;
