import React from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className='navbar-link' to="/">
        <div className="navbar-logo">
          <img src="ayuda_logo.png" alt="logo" className="logo"/>
          <span>Ayuda</span>
        </div>
      </Link>
        <div className="navbar-links">
          <a href="/about">About</a>
        </div>
    </nav>
  );
}

export default Navbar;
