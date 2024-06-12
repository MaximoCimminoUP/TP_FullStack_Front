import React, { useState } from 'react';
import './CustomizeStuffedAnimal.css';

const CustomizeStuffedAnimal = () => {
  const [type, setType] = useState('');
  const [colors, setColors] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    updatePreviewImage(e.target.value, colors, accessories);
  };

  const handleColorChange = (e) => {
    const newColors = e.target.checked
      ? [...colors, e.target.value]
      : colors.filter(color => color !== e.target.value);
    setColors(newColors);
    updatePreviewImage(type, newColors, accessories);
  };

  const handleAccessoryChange = (e) => {
    const newAccessories = e.target.checked
      ? [...accessories, e.target.value]
      : accessories.filter(accessory => accessory !== e.target.value);
    setAccessories(newAccessories);
    updatePreviewImage(type, colors, newAccessories);
  };

  const updatePreviewImage = (type, colors, accessories) => {
    const imageUrl = getStuffedAnimalImageURL(type, colors, accessories);
    setPreviewImage(imageUrl);
  };

  const getStuffedAnimalImageURL = (type, colors, accessories) => {
    let baseUrl = `/images/stuffedAnimals/${type}`;
    if (colors.length > 0) {
      baseUrl += `_${colors.join('_')}`;
    }
    if (accessories.length > 0) {
      baseUrl += `_${accessories.join('_')}`;
    }
    return `${baseUrl}.png`; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8050/user/customize-stuffedAnimal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ type, colors, accessories })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Stuffed Animal customized successfully!');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error customizing stuffed animal:', error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className="customize-stuffed-animal-container">
      <h2>Customize Your Stuffed Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Type</label>
          <select value={type} onChange={handleTypeChange} required>
            <option value="">Select a type</option>
            <option value="dog">Dog</option>
            <option value="rabbit">Rabbit</option>
            <option value="bear">Bear</option>
            <option value="raccoon">Raccoon</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div className="form-section">
          <label>Colors</label>
          <div className="color-options">
            <label>
              <input
                type="checkbox"
                value="pink"
                checked={colors.includes('pink')}
                onChange={handleColorChange}
              />
              <img src="/images/colors/pink.png" alt="Pink" />
            </label>
            <label>
              <input
                type="checkbox"
                value="yellow"
                checked={colors.includes('yellow')}
                onChange={handleColorChange}
              />
              <img src="/images/colors/yellow.png" alt="Yellow" />
            </label>
            <label>
              <input
                type="checkbox"
                value="green"
                checked={colors.includes('green')}
                onChange={handleColorChange}
              />
              <img src="/images/colors/green.png" alt="Green" />
            </label>
          </div>
        </div>
        <div className="form-section">
          <label>Accessories</label>
          <div className="accessory-options">
            <label>
              <input
                type="checkbox"
                value="soccerShirt"
                checked={accessories.includes('soccerShirt')}
                onChange={handleAccessoryChange}
              />
              <img src="/images/accessories/soccer_shirt.png" alt="Soccer Shirt" />
            </label>
            <label>
              <input
                type="checkbox"
                value="electricGuitar"
                checked={accessories.includes('electricGuitar')}
                onChange={handleAccessoryChange}
              />
              <img src="/images/accessories/electric_guitar.png" alt="Electric Guitar" />
            </label>
            <label>
              <input
                type="checkbox"
                value="notebook"
                checked={accessories.includes('notebook')}
                onChange={handleAccessoryChange}
              />
              <img src="/images/accessories/notebook.png" alt="Notebook" />
            </label>
          </div>
        </div>
        <button type="submit">Customize</button>
      </form>
      {previewImage && <img src={previewImage} alt="Stuffed Animal Preview" className="preview-image" />}
      {message && <p>{message}</p>}
    </div>
  );
};

export default CustomizeStuffedAnimal;
