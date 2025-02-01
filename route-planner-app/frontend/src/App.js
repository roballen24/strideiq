import React, { useState } from 'react';

function App() {
    const [routeData, setRouteData] = useState([]);
    const [error, setError] = useState(null);

    const generateRoute = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/generate-route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    start_location: '201 Herbert Court, Brentwood, TN',
                    distance_miles: 2,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch route data');
            }

            const data = await response.json();
            setRouteData(data.route || []); // Ensure `route` is always an array
            setError(null);
        } catch (err) {
            setRouteData([]);
            setError(err.message);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Run Safe</h1>
            <p>By Rob Allen</p>
            <button onClick={generateRoute}>Generate Route</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {routeData.length > 0 ? (
                <div>
                    <h2>Generated Route:</h2>
                    <ul>
                        {routeData.map((step, index) => (
                            <li key={index}>
                                <strong>Step {index + 1}:</strong> {step.html_instructions}
                                <br />
                                <strong>Distance:</strong> {step.distance.text}
                                <br />
                                <strong>Duration:</strong> {step.duration.text}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No route data available.</p>
            )}
        </div>
    );
}

export default App;
