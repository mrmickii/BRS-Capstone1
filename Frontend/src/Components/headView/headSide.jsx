import React, { useState, useEffect } from "react";
import '../../CSS/headCSS/headSide.css'
import Header from '../userView/header'
import SideNavBar from '../userView/sidenavbar'

const HeadSide = () =>{
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/department/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
        console.log('Success fetching department data.');
      } else {
        console.error('Failed to fetch department data.');
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  return(
    <div className="head-view-container">
      <Header />
      <SideNavBar />
      <div className="head-view-content-container">
        <div className="head-view-content">

          <div className="banner"></div>

          <div className="l-request">
            <h1>LIST OF REQUESTS</h1>
            <div className="department-selector">
              <p>Select Department:</p>
              <select 
                name="selector" 
                id="selector" 
                value={selectedDepartment} 
                onChange={handleDepartmentChange}
              >
                <option value="0">--Choose a Department--</option>
                {departments.map(department => (
                  <option key={department.id} value={department.id}>{department.name}</option>
                ))}
              </select>
              <button>Set Configuration</button>
            </div>
          </div>

          <div className="r-content">
            {/* DIRI MASULOD ANG CONTENT IF APPROVE BA OR DILI */}
          </div>
        </div>
      </div>
      <div className="bg-logo"></div>
    </div>
  );
}

export default HeadSide;
