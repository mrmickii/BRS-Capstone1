import React, { useState, useEffect } from 'react';
import Header from '../userView/header';
import HeadNavbar from './headNavBar';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import '../../CSS/headCSS/headSettings.css';

const HeadSettings = () => {
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

  const showChangePassword = () => {
    setDisplayedContainer('password');
  };

  const showViewAccount = () => {
    setDisplayedContainer('account');
  };

  return (
    <div>
      <Header />
      <HeadNavbar />
      <div className="settings-page-box">
        <h1>SETTINGS</h1>
        <div className="s-container-one">
          <button className="s-box-one" onClick={showViewAccount}>
            View Account
          </button>
          <button className="s-box-two" onClick={showChangePassword}>
            Change Password
          </button>
        </div>
        {displayedContainer === 'password' && (
          <div className="s-container-two">
            <h3>CHANGE PASSWORD</h3>
            <input type="password" placeholder='Current Password' />
            <input type="password" placeholder='New Password' />
            <input type="password" placeholder='Confirm Password' />
            <button className='btn-change-password'>Change Password</button>
          </div>
        )}
        {displayedContainer === 'account' && (
          <div className="s-container-three">
            <h3 className='acc-details'>ACCOUNT DETAILS</h3>
            {userData && (
              <div>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Department: {userData.department}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className='cit-bglogo'></div>
    </div>
  );
};

export default HeadSettings;
