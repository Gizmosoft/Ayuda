import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadUserFromSessionStorage } from "../../utils/SessionHandler.js";
import { getUserByEmailId, updateUserById } from "../../api/UserRequests.js";
import "./UserProfile.css";
import { Button } from "../Buttons/Button.js";
import { UserUpdatePopup } from "../Popups/UserUpdatePopup.js";
import { SkillsSearchBar } from "../Search/SkillsSearchBar.js";
import { DomainsSearchBar } from "../Search/DomainsSearchBar.js";

const UserProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState(null); // Directly store user object

  const [skills, setSkills] = useState([]);
  const [domains, setDomains] = useState([]);

  const [isPopupVisible, setPopupVisible] = useState(false);

  // function to append skills from the search bar
  const addSkills = (newSkills) => {
    setSkills((prevSkills) => [...prevSkills, newSkills]);
  }

  // function to append career paths from the search bar
  const addDomains = (newDomain) => {
    setDomains((prevDomains) => [...prevDomains, newDomain]);
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const removeDomain = (domainToRemove) => {
    setDomains(domains.filter((domain) => domain !== domainToRemove));
  };

  const showPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const saveUser = () => {
    // Save user profile using PATCH method
    // The updated user must take skills and domains array and update them in the DB
    updateUserById(user.email, skills, domains);
    showPopup();
  }

  useEffect(() => {
    async function fetchUserData() {
      const userEmail = loadUserFromSessionStorage()["email"];
      if (userEmail) {
        try {
          const userData = await getUserByEmailId(userEmail);
          setUser(userData.data);
          setSkills(userData.data.skills);
          setDomains(userData.data.career_path);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
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
          Welcome, {user ? user.name : "loading..."}!
        </h5>
        <p>Email: {user ? user.email : "loading..."} </p>
        {/* TODO: Show user Skills */}
        <SkillsSearchBar placeholder="Enter skills..." addSkills={addSkills} />
        <ul>
          <div className="skills-container">
            Skills:
            {user && skills.length > 0
              ? skills.map((skill, index) => (
                  // <li key={index}>{skill}</li>
                  <div key={index} className="skill-bubble">
                    {skill}
                    <span
                      className="remove-button"
                      onClick={() => removeSkill(skill)}
                    >
                      x
                    </span>
                  </div>
                ))
              : " No skills to show"}
          </div>
        </ul><br />

        <DomainsSearchBar placeholder="Enter career paths..." addDomains={addDomains} />
        <ul>
            {/* TODO: Make skills editable - add/remove */}
        <div className="skills-container">
            Future Career Paths:
            {user && domains.length > 0
              ? domains.map((domain, index) => (
                  // <li key={index}>{skill}</li>
                  <div key={index} className="skill-bubble">
                    {domain}
                    <span
                      className="remove-button"
                      onClick={() => removeDomain(domain)}
                    >
                      x
                    </span>
                  </div>
                ))
              : " No Career Path Set"}
          </div>
          </ul>
          <Button buttonText="Save Profile" onClick={saveUser} />
          {
            isPopupVisible && (
              <UserUpdatePopup closePopup={closePopup} />
            )
          }
      </div>
    </div>
  );
};

export default UserProfile;
