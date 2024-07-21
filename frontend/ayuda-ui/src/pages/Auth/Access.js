import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Access.css";
import axios from "axios";
import { BalloonNotif } from "../../components/Notifs/BalloonNotif.js";
import getBaseUrl from "../../utils/BaseUrl";

export const Access = () => {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState(false); // State to control the error Snackbar

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  const baseUrl = getBaseUrl();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(accessCode);
    try {
      // Make a POST request to your API endpoint with the access code
      const response = await axios.post(baseUrl + "/auth/access", {
        access_code: accessCode,
      });
      navigate('/signup')
    } catch (error) {
      console.error('Error:', error); 
      setError(true); // Set error state to true to trigger Snackbar
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false); // Close Snackbar
  };

  return (
    <div>
      <h3>Ayuda is currently an invite-only platform.</h3>
      <hr className="hr-tag"/>
      <p className="user-note">If you already have an access code for Ayuda, please enter it to proceed with Registration, else please write to the developer at <i>kartikey.hebbar@gmail.com</i> to request for an access code.</p>
      <form onSubmit={handleSubmit}>
        <input
          className="accessCode"
          type="text"
          id="Name"
          name="Name"
          size="20"
          placeholder="Access Code"
          value={accessCode}
          onChange={handleAccessCodeChange}
        />
        <br />
        <input
          className="accessCodeSubmit"
          type="submit"
          name="submit"
          value="Enter"
          id="submit"
        />
      </form>
      <Link className="redirection-link" to="/login" >Already a registered user? Login</Link>
      <BalloonNotif open={error} onClose={handleCloseSnackbar} message={"Entered Access Code is not correct!"}/>
    </div>
  );
};
