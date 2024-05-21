import React from "react";
import PropTypes from 'prop-types';
import './Button.css';

export const Button = ({ buttonText, onClick }) => {
  return (
    <input
      className="pink-button"
      type="button"
      name="pink-button"
      value={buttonText}
      id="pink-button"
      onClick={onClick}
    />
  );
};
