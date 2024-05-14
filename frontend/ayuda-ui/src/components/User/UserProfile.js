import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { loadUserFromSessionStorage } from "../../utils/SessionHandler.js";
import { getUserByEmailId } from "../../api/UserRequests.js";
import './UserProfile.css';

const UserProfile = () => {
    const location = useLocation();
    const [user, setUser] = useState(null); // Directly store user object

    useEffect(() => {
        async function fetchUserData() {
            const userEmail = loadUserFromSessionStorage()['email'];
            if (userEmail) {
                try {
                    const userData = await getUserByEmailId(userEmail);
                    setUser(userData.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setUser(undefined);
                }
            } else {
                console.log("No user email found in session storage.");
                setUser(undefined);
            }
        }
    
        fetchUserData(); // Call the function to execute the operations
      }, [location]);

  return (
    <div className="dashboard-div">
        <div className="user-section">
            <h5 className="welcome-header"> 
                Welcome, {user ? user.name : 'loading...'}!
            </h5>
            <p>Email: {user ? user.email : 'loading...'} </p>
            {/* TODO: Show user Skills */}
            <ul>
                Skills:
                {user ? user.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                )) : "No skills to show"}
            </ul>
            <ul>
                Career Path:
                {user ? user.career_path.map((path, index) => (
                    <li key={index}>{path}</li>
                )) : "No skills to show"}
            </ul>
            {/* TODO: Make skills editable - add/remove */}
        </div>
    </div>
  );
}

export default UserProfile
