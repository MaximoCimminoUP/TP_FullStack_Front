import React, { useState, useEffect } from 'react';

const stuffedAnimalRanking= () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch('http://localhost:8050/stuffedAnimal-ranking');
        const data = await response.json();
        setRanking(data.plushieRanking);
      } catch (error) {
        console.error('Error fetching stuffed animal ranking:', error);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div className="stuffedAnimalRanking">
      <h2>Plushie Ranking</h2>
      <div className="podium">
        {ranking.slice(0, 3).map((item, index) => (
          <div key={index} className={`podium-item podium-item-${index + 1}`}>
            <h3>{item._id}</h3>
            <p>Purchases: {item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default stuffedAnimalRanking;
