import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/cart'); // Assuming proxy is set up or you use absolute URL
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart ? (
        <div>
          <h3>Items in Cart</h3>
          <ul>
            {cart.items.map(item => (
              <li key={item.productId}>
                {item.productId} - Quantity: {item.quantity}
                <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Cart;
