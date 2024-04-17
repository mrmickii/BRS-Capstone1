import React from "react";
import '../../CSS/headCSS/dialogBox.css'

// Dialog Box
const FileDialogBox = ({ onClose, reservation }) => {
  const handleDownload = () => {
    const downloadUrl = `http://localhost:8080/reservation/reservations/download/${reservation.id}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', reservation.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="file-dialog-overlay">
      <div className="file-dialog">
        <div className="file-dialog-header">
          <h3>File Details:</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className="file-dialog-content">
          {reservation ? (
            <div className="file-download-container">
              <p>File Name: {reservation.fileName}</p>
              <button onClick={handleDownload}>Download</button>
            </div>
          ) : (
            <p>No reservation selected.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDialogBox;