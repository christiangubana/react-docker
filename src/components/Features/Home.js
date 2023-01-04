import React, { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(false);
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChampions = async () => {
      try {
      setLoading(true);
      const response = await fetch("https://ergast.com/api/f1.json");
      const data = await response.json();
      setChampions(data.MRData.RaceTable.Races);
      setLoading(false);
      } catch (e) {
        setError(e);
        console.error(Error(e.message ?? e))
      }
    };
    loadChampions();
  }, []);
  return (
    <div className="races">
      <div className="content">
        <h1>F1 Champions</h1>
        <p style={{ color: "red" }}>{error.message}</p>
        {loading ? (
          <h4>Loading...</h4>
        ) : (
          Object.values(champions).map((item, index) => {
            return (
             <table key={index} className="api-data">
              <thead>
                <tr>
                <th>Race Name</th>
                <th>Season</th>
                <th>Country</th>
                <th>Round</th>
                <th>Circuit Name</th>
                <th>Data</th>
                </tr>
              </thead>
              <tbody>
               <tr>
               <td>{item.raceName}</td>
                <td>{item.season}</td>
                <td>{item.Circuit.Location.country}</td>
                <td>{item.round}</td>
                <td>{item.Circuit.circuitName}</td>
                <td>{item.date}</td>
               </tr>
              </tbody>
             </table>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;

// https://ergast.com/api/f1/2005/last.json

// https://ergast.com/api/f1.json
