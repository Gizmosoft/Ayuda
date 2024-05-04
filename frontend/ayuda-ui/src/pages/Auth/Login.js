import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Access.css";
import axios from "axios";
import getBaseUrl from "../../utils/BaseUrl";
import { BalloonNotif } from "../../components/Notifs/BalloonNotif.js";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState(false); // State to control the error Snackbar

  const handleEmailAddressChange = (e) => {
    setEmailId(e.target.value);
  };

  const baseUrl = getBaseUrl();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make a POST request to your API endpoint with the access code
      const response = await axios.post(baseUrl + "/auth/login", {
        email: emailId,
      });
      console.log(response.data);
      // TODO: Store user in session
      navigate("/dashboard");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
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
          value="Login"
          id="login"
        />
      </form>
      <Link className="redirection-link" to="/">
        Email not registered? Register
      </Link>
      <BalloonNotif
        open={error}
        onClose={handleCloseSnackbar}
        message={"Enter correct email ID"}
      />
    </div>
  );
};
