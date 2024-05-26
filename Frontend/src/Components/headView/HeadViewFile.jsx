import React from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import '../../CSS/headCSS/head-view-file.css';

const HeadViewFile = ({ onClose, reservation }) => {
  const handleView = async () => {
    try {
      if (!reservation || !reservation.fileName) {
        console.error("No file associated with the reservation.");
        return;
      }
      const fileRef = ref(storage, `${reservation.fileName}`);
      const downloadUrl = await getDownloadURL(fileRef);
  
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };  

  return (
    <div className="file-dialog-overlay">
      <div className="file-dialog">
        <div className="file-dialog-header">
          <h3>File Details:</h3>
          <button onClick={onClose}>X</button>
        </div>
        <div className="file-dialog-content">
          {reservation && reservation.fileName ? (
            <div className="file-download-container">
              <p>File Name: {reservation.fileName}</p>
              <button onClick={handleView}>View</button>
            </div>
          ) : (
            <p>No file attached to this reservation.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadViewFile;
