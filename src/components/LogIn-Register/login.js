import React, { useState } from 'react';
import axios from 'axios';
import './login-register.CSS';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      console.log('Login successful:', response.data.token);
      // Handles successful login, redirect to another page
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      // Handles login failure, shows error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
