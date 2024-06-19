import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login-register.css';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', { email, name, lastname, password });
      console.log('Registration successful:', response.data.user);
      navigate('/login');
      // Handles successful registration, shows success message
    } catch (error) {
      if (error.response) {
        // Handle the response error here
        console.error('Registration failed:', error.response.data.error);
      } else {
        // Handle errors that don't have a response (like network errors)
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
    <div className="auth-container">
            <h2 className="auth-title">Register</h2>
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
                <label htmlFor="name" className="input-label">Name</label>
                <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="lastname" className="input-label">Lastname</label>
                <input
                    type="text"
                    id="lastname"
                    className="input-field"
                    placeholder="Enter your lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
            <button className="submit-button" onClick={handleRegister}>Register</button>
        </div>
    );
};


export default Register;
