import React, { useState, useEffect } from 'react';
import Header from '../userView/Header';
import SideNavbar from './SideNavbar';
import { auth, db } from '../../FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import '../../CSS/headCSS/head-settings.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdOutlineManageAccounts } from "react-icons/md";
import { updatePassword } from "firebase/auth";

const Settings = () => {
  const [displayedContainer, setDisplayedContainer] = useState('account');
  const [userData, setUserData] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userEmail = user.email;
        const name = capitalizeFirstLetter(userEmail.split('@')[0].replace('.', ' '));

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userDataFromFirestore = userDocSnap.data();
          const { department, userType } = userDataFromFirestore;

          setUserData({
            name: name,
            email: userEmail,
            department: department,
            userType: userType 
          });
        } else {
          console.error('User document does not exist');
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const capitalizeFirstLetter = string => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleChangePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        return;
      }

      const confirm = window.confirm("Are you sure you want to change your password?");
      if (!confirm) return;

      const user = auth.currentUser;
      const credential = await signInWithEmailAndPassword(auth, user.email, currentPassword);
      
      if (credential.user) {
        await updatePassword(user, newPassword);
        setSuccess("Password updated successfully");
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setError(null); // Reset error message when successful
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password. Please try again.");
      setSuccess(null); // Reset success message on error
    }
  };

  const showChangePassword = () => {
    setDisplayedContainer('password');
  };

  const showViewAccount = () => {
    setDisplayedContainer('account');
  };

  return (
    <div>
      <Header />
      <SideNavbar />
      <div className="settings-page-box">
        <h1>SETTINGS</h1>
        <div className="s-container-one">
          <button className="s-box-one" onClick={showViewAccount}>
          <MdOutlineManageAccounts />View Account
          </button>
          <button className="s-box-two" onClick={showChangePassword}>
            Change Password
          </button>
        </div>
        {displayedContainer === 'password' && (
          <div className="s-container-two">
            <h3>CHANGE PASSWORD</h3>
            <input
               style={{width: '500px'}}
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
            style={{width: '500px'}}
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
               style={{width: '500px'}}
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <p className="password-requirements"><span>Note:</span> Password must be at least 6 characters long.</p>
            <button className='btn-change-password' onClick={handleChangePassword}>
              Change Password
            </button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </div>
        )}
        {displayedContainer === 'account' && (
          <div className="s-container-three">
            <h3 className='acc-details' style={{fontSize: '24px'}}>ACCOUNT DETAILS</h3>
            {userData && (
              <div>
                <p style={{fontSize: '20px', marginBottom: '10px'}}>Name: {userData.name}</p>
                <p style={{fontSize: '18px'}}>Email: {userData.email}</p>
                <p style={{fontSize: '18px'}}>Department: {userData.department}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default Settings;
