import React, { useState } from "react";
import "./Access.css";
import getBaseUrl from "../../utils/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { saveUserToSessionStorage, loadUserFromSessionStorage } from "../../utils/SessionHandler.js";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
  const baseUrl = getBaseUrl();
  const navigate = useNavigate();

  const handleEmailAddressChange = (e) => {
    setEmailId(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(emailId);
    try {
        const response = await axios.get(`${baseUrl}/users/get-user`, {
          params: {
            email: emailId,
          }
        });
        const userObject = response.data
        console.log(userObject);
        console.log('User found in DB, redirecting to Dashboard...');
        // TODO: Store user in Session and login
        saveUserToSessionStorage(userObject);
        navigate("/dashboard");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("User not found in DB. Proceeding to create user model");
          // TODO: Create User object in DB, then login and store user in session
          const userObject = {
            name: userName,
            email: emailId
          }
          try {
            const response = await axios.post(baseUrl + '/auth/register', userObject);
            console.log('Server response: ', response);
            console.log('New user created! Redirecting to dashboard...');
            saveUserToSessionStorage(userObject);
            navigate("/dashboard");
          } catch (error) {
            console.error('There was an error!', error);
          }
        } else {
          console.error("Error:", error.response ? error.response.data : error.message);
        }
      }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h5>Signup Here!</h5>
        <input
          className="accessCode"
          type="text"
          id="text"
          name="email"
          size="20"
          placeholder="Name"
          value={userName}
          onChange={handleUserNameChange}
        /><br />
        <input
          className="accessCode"
          type="email"
          id="email"
          name="email"
          size="20"
          placeholder="Email"
          value={emailId}
          onChange={handleEmailAddressChange}
        />
        <br />
        <input
          className="accessCodeSubmit"
          type="submit"
          name="login"
          value="Register"
          id="login"
        />
      </form>
    </div>
  );
};

export default Signup;
