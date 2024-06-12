import React, { useState } from 'react';
import axios from 'axios';
import './login-register.CSS';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { email, name, lastname, password });
      console.log('Registration successful:', response.data.user);
      // Handles successful registration, shows success message
    } catch (error) {
      console.error('Registration failed:', error.response.data.error);
      // Handles registration failure, shows error message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Lastname" 
        value={lastname} 
        onChange={(e) => setLastname(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
