import React from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar__left">
          <Link to="/cart">Cart</Link>
        </div>
        <div className="top-bar__right">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
