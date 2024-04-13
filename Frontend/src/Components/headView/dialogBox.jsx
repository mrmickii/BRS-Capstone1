import React from "react";
import '../../CSS/headCSS/dialogBox.css'

const FileDialogBox = ({ onClose }) => {
  return (
    <div className="file-dialog-overlay">
      <div className="file-dialog">
        <div className="file-dialog-header">
          <h2>File Dialog Box</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="file-dialog-content">
          {/* Content of the file dialog */}
          <p>This is the content of the file dialog.</p>
        </div>
      </div>
    </div>
  );
};

export default FileDialogBox;
