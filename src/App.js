import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar/topBar'; 
import LandingPage from './components/LandingPage/LandingPage';
import Cart from './components/Cart/cart';
import Login from './components/LogIn-Register/login';
import Register from './components/LogIn-Register/register';
import Profile from './components/Profile/profile';

const App = () => {
  return (
    <Router>
      <div>
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
