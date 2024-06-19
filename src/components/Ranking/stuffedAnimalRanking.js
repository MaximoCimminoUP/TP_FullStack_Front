import React, { useState, useEffect } from 'react';

const stuffedAnimalRanking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:8080/PokemonRank');
        const data = await response.json();
        
        // Check if data.plushieRanking is defined before setting state
        if (data && data.plushieRanking) {
          setRanking(data.plushieRanking);
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
      <h2>Plushie Ranking</h2>
      <div className="podium">
        {ranking.length > 0 ? (
          ranking.slice(0, 3).map((item, index) => (
            <div key={index} className={`podium-item podium-item-${index + 1}`}>
              <h3>{item._id}</h3>
              <p>Purchases: {item.count}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default stuffedAnimalRanking;
