import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Cart from './components/Cart/cart'; 
import Login from './components/LogIn-Register/login';
import Register from './components/LogIn-Register/register';
import Profile from './components/Profile/';
import App from './App';
import './indexStyle.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  </Router>
);
