import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  //stores user information
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [purchases, setPurchases] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    
  };

  //fetches user's previous purchases
  const fetchPurchases = async () => {
    try {
      const response = await axios.get('/api/purchases');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <div>
        <p>Email: {email}</p> {}
        <input type="file" onChange={handleFileUpload} /> {}
        <img src={profilePicture} alt="Profile" /> {}
      </div>
      <div>
        <h2>Previous Purchases</h2>
        <ul>
          {purchases.map((purchase) => (
            <li key={purchase.id}>
              <img src={purchase.stuffedAnimal.pictureUrl} alt="Stuffed Animal" />
              <p>{purchase.stuffedAnimal.name}</p>
              <p>{purchase.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
