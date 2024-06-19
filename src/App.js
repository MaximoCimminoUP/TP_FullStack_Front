import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './components/auth/authContext';
import LandingPage from './components/LandingPage/landingPage';
import Cart from './components/Cart/cart';
import Login from './components/LogIn-Register/login';
import Register from './components/LogIn-Register/register';
import Profile from './components/Profile/profile';
import CustomizePokemon from './components/CustomizePokemon/customizePokemon';
import TopBar from './components/TopBar/topBar';
const App = () => {
  return (
    <AuthProvider> 
      <div>
        <TopBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/api/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pokemon" element={<CustomizePokemon />} />
            <Route path="/pokemon/:name" element={<CustomizePokemon />} />
            <Route path="/customize/:name" element={<CustomizePokemon />} />

          </Routes>
        </div>
      </div>
      </AuthProvider>
  );
};

export default App;
