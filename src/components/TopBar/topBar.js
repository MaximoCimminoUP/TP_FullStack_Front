import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth/authContext';
import profilepic from '/images/blank-profile-picture-973460_1280.png';
import banner from '/images/Logos/Banner.png';
import './topBar.css';

function TopBar({ dropdownOpen, toggleDropdown, handleLogout }) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar__left">
          <img src={banner} alt="Banner" className="banner-image" />
        </div>
        <div className="top-bar__right">
          <Link to="/" className="top-bar__link">Home</Link>
          {isLoggedIn ? (
            <div className="dropdown">
              <Link to="/profile" className="profile-link">
                <img src={profilepic} alt="Profile" className="profile-icon" onClick={toggleDropdown} />
              </Link>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/profile" className="dropdown-link">Profile</Link>
                  <button onClick={logout} className="dropdown-button">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="loginRegister-Div" id="loginRegister-Div">
              <Link to="/login" className="top-bar__link">Login</Link>
              <Link to="/register" className="top-bar__link">Register</Link>
            </div>
          )}
          <Link to="/api/cart" className="top-bar__link">Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
