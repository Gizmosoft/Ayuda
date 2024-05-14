import React, { useState } from "react";
import "./Access.css";
import { useNavigate } from "react-router-dom";
import { saveUserToSessionStorage } from "../../utils/SessionHandler.js";
import { getUserByEmailId } from "../../api/UserRequests.js";
import { registerUser } from "../../api/AuthRequests.js";

const Signup = () => {
  const [emailId, setEmailId] = useState("");
  const [userName, setUserName] = useState("");
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
        const response = await getUserByEmailId(emailId);
        const userObject = response.data
        console.log(userObject);
        console.log('User found in DB, redirecting to Dashboard...');
        // TODO: Store user in Session and login
        saveUserToSessionStorage(userObject);
        navigate("/dashboard");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("User not found in DB. Proceeding to create user model");
          // Create User object in DB, then login and store user in session
          const userObject = {
            name: userName,
            email: emailId
          }
          try {
            // Register the new user
            const response = await registerUser(userObject);
            console.log('Server response: ', response);
            console.log('New user created! Redirecting to dashboard...');
            // get the new user to store in the session
            const user = await getUserByEmailId(userObject['email']);
            saveUserToSessionStorage(user.data);
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
