import React from "react";
import { Button } from "../Buttons/Button.js";
import './UserUpdatePopup.css';

export const UserUpdatePopup = ({ closePopup }) => {
  return (
    <div className="user-update-popup-outer">
      <div className="user-update-popup-inner">
        <p>User profile has been saved!</p>
        <Button buttonText="OK" onClick={closePopup} />
      </div>
    </div>
  );
};
