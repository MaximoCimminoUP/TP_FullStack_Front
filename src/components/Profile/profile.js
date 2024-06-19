import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import defaultProfilePicture from '/images/blank-profile-picture-973460_1280.png';
import './profile.css';
import { useAuth } from '../auth/authContext';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [purchases, setPurchases] = useState([]); // Initialize as an empty array

  const [cookies] = useCookies(['token']);
  const { authUser } = useAuth();

  const fetchPurchases = async () => {
    try {
      const token = cookies.token;
      const response = await axios.get('http://localhost:8080/api/purchases', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched purchases:', response.data); // Log the fetched purchases
      setPurchases(response.data); // Assuming response.data is an array of purchases
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setPurchases([]); // Handle error by setting purchases to an empty array
    }
  };

  useEffect(() => {
    if (cookies.token) {
      fetchPurchases();
    }
  }, [cookies.token]); // Fetch purchases when token changes

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <p>Email: {authUser.email}</p>
        <img src={profilePicture || defaultProfilePicture} alt="Profile" className="profile-picture" />
      </div>
      <div className="previous-purchases">
        <h2>Previous Purchases</h2>
        {purchases.length > 0 ? (
          <ul className="purchase-list">
            {purchases.map((purchase) => (
              purchase.items.map((item) => (
                <li key={item._id} className="purchase-item">
                  <img 
                    src={item.isShiny ? item.shinyImage : item.image} 
                    alt="Pokemon" 
                    className="purchase-image" 
                    onError={(e) => { e.target.src = defaultProfilePicture; }} // Fallback to default image on error
                  />
                  <div className="purchase-details">
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    {item.accessories && item.accessories.length > 0 && (
                      <div className="accessories">
                        {item.accessories.map((accessory, index) => (
                          <img 
                            key={index} 
                            src={accessory.image} 
                            alt={accessory.name} 
                            className="accessory-image" 
                            onError={(e) => { e.target.src = defaultProfilePicture; }} // Fallback to default image on error
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))
            ))}
          </ul>
        ) : (
          <p>No previous purchases.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
