import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './cart.css';

const Cart = () => {
  const [message, setMessage] = useState('');
  const [cart, setCart] = useState(null);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      fetchCart();
    }
  }, [cookies.token]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cart', {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setMessage('Error fetching cart data');
    }
  };

  const handleRemoveItem = async (pokemonName) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${pokemonName}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setMessage('Error removing item from cart');
    }
  };

  const handlePurchase = async () => {
    try {
      // Log purchase
      const purchaseResponse = await axios.post('http://localhost:8080/api/purchase', {
        cartItems: cart.items
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (purchaseResponse.status !== 200) {
        setMessage('Error during purchase');
        return;
      }

      // Clear cart after successful purchase
      const clearCartResponse = await axios.delete('http://localhost:8080/api/cart/remove', {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });

      if (clearCartResponse.status !== 200) {
        setMessage('Error clearing cart');
        return;
      }

      setMessage('Purchase successful! Cart cleared.');

      // Optionally, refetch cart data or update UI as needed
      fetchCart();

    } catch (error) {
      console.error('Error during purchase:', error);
      setMessage('Error during purchase');
    }
  };


  return (
    <div className="cart-container">
    <h2>Cart</h2>
    {cart ? (
      <div>
        <h3>Items in Cart</h3>
        {cart.items && cart.items.length > 0 ? (
          <ul className="cart-items">
            {cart.items.map(item => (
              <li key={item.name} className="cart-item">
                <div className="pokemon-info">
                  <img src={item.isShiny ? item.shinyImage : item.image} alt={item.name} className="pokemon-image" />
                  <div className="product-details">
                    <div className="product-id">{item.name}</div>
                    <div className="quantity">Quantity: {item.quantity}</div> {/* Ensure quantity is displayed */}
                  </div>
                </div>
                <div className="accessories">
                  {item.accessories.map((accessory, index) => (
                    <img key={index} src={accessory.image} alt={accessory.name} className="accessory-image" />
                  ))}
                </div>
                <button onClick={() => handleRemoveItem(item.name)} className="remove-button">Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Cart is empty.</p>
        )}
      </div>
    ) : (
      <p>Loading...</p>
    )}
    <button className="purchase-button" onClick={handlePurchase}>Purchase</button>
    {message && <p className="message">{message}</p>}
  </div>
);
};
export default Cart;