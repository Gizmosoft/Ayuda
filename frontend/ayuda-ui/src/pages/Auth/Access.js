import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Access.css";
import axios from "axios";
import { BalloonNotif } from "../../components/Notifs/BalloonNotif.js";

export const Access = () => {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState(false); // State to control the error Snackbar

  const handleAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make a POST request to your API endpoint with the access code
      const response = await axios.post("http://localhost:5000/access", {
        access_code: accessCode,
      });
      // Handle the response if needed
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      // Handle errors
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
      <BalloonNotif open={error} onClose={handleCloseSnackbar} />
    </div>
  );
};
