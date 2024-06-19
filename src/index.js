import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage/landingPage';
import Cart from './components/Cart/cart'; 
import Login from './components/LogIn-Register/login';
import Register from './components/LogIn-Register/register';
import Profile from './components/Profile/profile';

import App from './App';
import './indexStyle.css';
import CustomizePokemon from './components/CustomizePokemon/customizePokemon';

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <Router>
    <Routes>
      <Route path="*" element={<App />}>
        <Route index element={<LandingPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path= "customize" element ={<CustomizePokemon />} />
      </Route> 
    </Routes>
  </Router>

);
