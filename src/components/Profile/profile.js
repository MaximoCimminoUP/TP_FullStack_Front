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
      setPurchases(response.data); // Assuming response.data is an array of purchases
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setPurchases([]); // Handle error by setting purchases to an empty array
    }
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get('http://localhost:8080/api/purchases', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPurchases(response.data); // Assuming response.data is an array of purchases
      } catch (error) {
        console.error('Error fetching purchases:', error);
        setPurchases([]); // Handle error by setting purchases to an empty array
      }
    };

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
              <li key={purchase._id} className="purchase-item">
                <img src={purchase.image} alt="Pokemon" className="purchase-image" />
                <div className="purchase-details">
                  <p>{purchase.name}</p>
                  <p>Quantity: {purchase.quantity}</p>
                  <div className="accessories">
                    {purchase.items.map((item, index) => (
                      <img key={index} src={item.image} alt={item.name} className="accessory-image" />
                    ))}
                  </div>
                </div>
              </li>
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
