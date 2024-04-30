import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="ayuda_logo.png" alt="logo" className="logo"/>
        <span>Ayuda</span>
      </div>
      <div className="navbar-links">
        <a href="/about">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
