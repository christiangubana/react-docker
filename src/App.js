import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    const loadChampions = async () => {
      setLoading(true);
      const response = await fetch("https://ergast.com/api/f1/2005/last.json");
      const data = await response.json();
      setChampions(data.MRData.RaceTable.Races);
      setLoading(false);
    };
    loadChampions();
  }, []);
  return (
    <div className="App">
      <div className="App-header">
        <h1>All F1 Champions</h1>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          Object.values(champions).map((item, index) => {
            return (
              <ul key={index}>
                <li>{item.raceName}</li>
                <li>{item.season}</li>
                <li>{item.round}</li>
                <li>{item.date}</li>
                <li>{item.Circuit.circuitName}</li>
                <li>{item.Circuit.Location.country}</li>
              </ul>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;

// https://ergast.com/api/f1/2005/last.json
