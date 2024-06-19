import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './CustomizePokemon.css';

const CustomizePokemon = () => {
  const { name } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [isShiny, setIsShiny] = useState(false);
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    fetchPokemon();
  }, [name]);
console.log('The token in the cookies is:',cookies.token);
  const fetchPokemon = async () => {
    try {
      const response = await fetch(`http://localhost:8080/pokemon/${name}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Received Pokémon data:', data);
        setSelectedPokemon(data);

        if (!isPokemonInEvolutionChain(name, evolutionChain)) {
        
          const fullEvolutionChain = [data.name, ...data.evolutions.filter(evo => evo !== data.name)];
          setEvolutionChain(fullEvolutionChain);
        }

        setSelectedAccessories([]);
        setIsShiny(false);
        setPreviewImage(data.image);
      } else {
        console.error('Failed to fetch Pokémon data. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error.message);
    }
  };

  const isPokemonInEvolutionChain = (pokemonName, evolutionChain) => {
    return evolutionChain.includes(pokemonName);
  };

  const handleEvolutionChange = (evolution) => {
    updatePreviewImage(evolution, isShiny, selectedAccessories);
    navigate(`/pokemon/${evolution}`);
  };

  const handleAccessoryChange = (e) => {
    const accessory = e.target.value;
    const isChecked = e.target.checked;

    // Create an array of selected accessories
    const newAccessories = isChecked
      ? [...selectedAccessories, accessory]
      : selectedAccessories.filter(acc => acc !== accessory);

    setSelectedAccessories(newAccessories);
  };

  const handleShinyChange = () => {
    const newShinyState = !isShiny;
    setIsShiny(newShinyState);
    updatePreviewImage(name, newShinyState);
  };

  const updatePreviewImage = (name, isShiny) => {
    let imageUrl = `/images/pokemon/${name}`;
    if (isShiny) {
      imageUrl += '_shiny';
    }
    setPreviewImage(`${imageUrl}.png`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/customize-pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify({
          type: selectedPokemon.name,
          evolutions: evolutionChain, 
          image: selectedPokemon.image,
          shinyImage: isShiny ? selectedPokemon.shinyImage : selectedPokemon.image, 
          isShiny: isShiny,
          accessories: selectedAccessories.map(accessory => ({
            name: accessory,
            image: `/images/accessories/${accessory}.png`
          })),
          quantity: quantity,
          isBaseEvolution: selectedPokemon.isBaseEvolution 
        })
      });
  
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.error || 'Error customizing Pokémon');
        return;
      }
  
      const data = await response.json();
      setMessage('Pokémon customized successfully!');
      console.log('Customized Pokémon:', data.pokemon);
  
      // Optionally, fetch updated cart data here if needed
      const cartResponse = await fetch('http://localhost:8080/api/cart', {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      });
  
      if (!cartResponse.ok) {
        const errorData = await cartResponse.json();
        console.error('Error fetching cart:', errorData.error);
        return;
      }
  
      const cartData = await cartResponse.json();
      console.log('Updated Cart Data:', cartData);
  
    } catch (error) {
      console.error('Error customizing Pokémon:', error);
      setMessage('Internal server error');
    }
  };
  

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value);
    value = isNaN(value) ? 1 : value;
    value = Math.min(Math.max(1, value), 10); 
    setQuantity(value);
  };

  return (
    <div className="customize-pokemon-container">
    <div className="pokemon-details">
      <div className="selected-pokemon">
        {selectedPokemon && (
          <>
            <img src={previewImage} alt="Pokémon Preview" className="preview-image" />
            <div className="pokemon-name">{selectedPokemon.name}</div>
            <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={10}
              />
            <label>
              <input
                type="checkbox"
                checked={isShiny}
                onChange={handleShinyChange}
              />
              Shiny Version
            </label>
          </>
        )}
      </div>
      <div className="accessories-section">
        <h3>Accessories</h3>
        <div className="accessory-options">
          <label>
            <input
              type="checkbox"
              value="pokeball"
              checked={selectedAccessories.includes('pokeball')}
              onChange={handleAccessoryChange}
            />
            <img src="/images/accessories/pokeball.png" alt="Pokeball" className="accessory-image" />
          </label>
          <label>
            <input
              type="checkbox"
              value="cap"
              checked={selectedAccessories.includes('cap')}
              onChange={handleAccessoryChange}
            />
            <img src="/images/accessories/cap.png" alt="Cap" className="accessory-image" />
          </label>
        </div>
        <button type="button" className="customize-button" onClick={handleSubmit}>
          Add to cart
        </button>
      </div>
    </div>
    {selectedPokemon && (
      <div className="evolution-section">
        <h3>Evolve Your Pokémon!</h3>
        <div className="evolution-options">
          {evolutionChain.map((evolution, index) => (
            <React.Fragment key={evolution}>
              {index > 0 && (
                <button
                  type="button"
                  className="evolution-separator"
                  disabled
                >
                  →
                </button>
              )}
              <a
                href={evolution === name ? null : `/pokemon/${evolution}`}
                className={`evolution-button ${evolution === name ? 'selected' : ''}`}
                onClick={(e) => {
                  if (evolution !== name) {
                    e.preventDefault();
                    handleEvolutionChange(evolution);
                  }
                }}
              >
                <img src={`/images/pokemon/${evolution}.png`} alt={evolution} className="evolution-image" />
                {evolution}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    )}
    <div className="preview-section">
      {message && <p className="message">{message}</p>}
    </div>
  </div>
);
};

export default CustomizePokemon;
