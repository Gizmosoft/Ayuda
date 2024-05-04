import React, { useState } from "react";
import "./Access.css";
import getBaseUrl from "../../utils/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      // TODO: Check if the email is existing, if yes then Login ('/login)
      const user = await axios.get(baseUrl + "/users/get-user", {
        params: {
            email: emailId,
        }
      });
      console.log(user);
      // TODO: Store user model in UserDB and redirect user to Dashboard ('/dashboard)
      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
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
