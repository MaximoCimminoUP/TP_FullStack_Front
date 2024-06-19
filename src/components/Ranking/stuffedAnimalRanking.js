import React, { useState, useEffect } from 'react';
import './stuffedAnimalRanking.css';

const StuffedAnimalRanking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:8080/PokemonRank');
        const data = await response.json();

        if (data && data.pokemonRanking) {
          setRanking(data.pokemonRanking);
        } else {
          console.error('Error: No pokemon ranking data received.');
        }
      } catch (error) {
        console.error('Error fetching pokemon ranking:', error);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div className="stuffedAnimalRanking">
      <div className="podium">
        {ranking.length > 0 ? (
          ranking.map((item, index) => (
            <div key={index} className={`podium-item podium-item-${index + 1}`}>
              <h3>{item.name}</h3>
              <div>
                <img src={item.isShiny ? item.shinyImage : item.image} alt={item.name} style={{ maxWidth: '200px' }} />
              </div>
              <p>Shiny: {item.isShiny ? 'Yes' : 'No'}</p>
              <p>Purchases: {item.totalQuantity}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};


export default StuffedAnimalRanking;
