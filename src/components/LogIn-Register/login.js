import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; 
import './login-register.css';
import { useAuth } from '../auth/authContext';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const {isLoggedIn,setIsLoggedIn,setAuthUser,login}  = useAuth();

/*
const logout = () => {
    setIsLoggedIn(false);
    setAuthUser(null); // Clear any authenticated user data if needed
};*/

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/login', { email, password });
    console.log('API Response:', response); // Check the entire response object for debugging

    if (response && response.data && response.data.token) {
      const { token, email } = response.data; // Destructure token and email from response.data
      console.log('Login successful:', token);
      console.log('Email:', email);

      // Use the login function from useAuth context to set authUser
      login({ email, token });

      // Set token in cookies
      setCookie('token', token, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });

      // Navigate to profile page after successful login
      navigate('/profile');
    } else {
      console.error('Login failed: Invalid response format');
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data?.error || error.message);
  }
};


  return (
    <div className="auth-container">
    <h2 className="auth-title">Login</h2>
    <div className="input-group">
      <label htmlFor="email" className="input-label">Email</label>
      <input
        type="email"
        id="email"
        className="input-field"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="input-group">
      <label htmlFor="password" className="input-label">Password</label>
      <input
        type="password"
        id="password"
        className="input-field"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button className="submit-button" onClick={handleLogin}>Login</button>
  </div>
);
};

export default Login;
