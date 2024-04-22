import React from 'react';
import '../../CSS/opcCSS/modal.css';

function ApproveModal({ onClose }) {

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );

  return (
    <div className="approvemodalBackground">
      <div className="approvemodalContainer">
        <Button onClick={onClose}> X </Button>
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
          <button  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2" type="button">CANCEL</button>
          <br></br>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="submit">SAVE CHANGES</button>
        </form>
      </div>
    </div>
  );
}

export default ApproveModal;
