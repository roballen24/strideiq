import React from "react";
import { useState } from "react";

function App() {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);

  const fetchRoute = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/generate-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_location: "1023 8th Ave S, Nashville, TN",
          distance_miles: 2.0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the route.");
      }

      const data = await response.json();
      setRoute(data.route);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Run Safe</h1>
      <button onClick={fetchRoute}>Generate Route</button>
      {route && (
        <div>
          <h2>Route Details</h2>
          <pre>{JSON.stringify(route, null, 2)}</pre>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
