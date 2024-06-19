import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../TopBar/topBar';
import { useState, useEffect } from 'react';
import logo from '/images/Logos/Logo.png'
import StuffedanimalRanking from '../Ranking/stuffedAnimalRanking';

import './landingPage.css'; 

const LandingPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('http://localhost:8080/pokemon');
      if (response.ok) {
        const data = await response.json();
        console.log('Received Pokémon data:', data);
        setPokemons(data);
      } else {
        console.error('Failed to fetch Pokémon data. Server returned:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error.message);
    }
  };

    return (
      <div className="bg-gray-200">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Pokemon Logo" />
        </div>
        <div className="welcome-text">
          <h1>Welcome to the Pokemon plush store!</h1>
        </div>
        <div className="ranking-container">
          <h2 className="pokemon-rank-text">Top Ranked Pokémon</h2>
          <StuffedanimalRanking />
        </div>
        <div className="pokemon-gallery-title">
          <h2 className = "pokemon-plushes">Pokemon Plushes</h2>
        </div>
        <div className="pokemon-gallery">
          {pokemons.map(pokemon => (
            <Link key={pokemon._id} to={`/customize/${pokemon.name}`}>
              <img
                src={`/images/pokemon/${pokemon.name}.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


  
export default LandingPage;
