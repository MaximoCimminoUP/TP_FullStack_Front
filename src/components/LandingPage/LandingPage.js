import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar/topBar';
import StuffedanimalRanking from '../Ranking/stuffedAnimalRanking';

const LandingPage = () => {
  return (
    <div>
      <TopBar />
      <div className="container">
        <h1>Welcome to Plushie Customization App</h1>
        <p>This app allows you to customize plushies before purchasing them.</p>
        <Link to="/profile">View Your Profile</Link>
        <StuffedanimalRanking />
      </div>
    </div>
  );
};

export default LandingPage;
