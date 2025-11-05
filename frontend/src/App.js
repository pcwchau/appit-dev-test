import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("http://localhost:5000/weather");
        setWeather(response.data);
      } catch (err) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="loading">Loading weather...</div>;
  if (error) return <div className="error">{error}</div>;

  const place = weather.place;
  const temp = weather.temperature?.value;
  const humidity = weather.humidity?.value;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Current Weather in Hong Kong</h1>
        <div className="weather-card">
          <h2>Place: {place ?? "-"}</h2>
          <p>
            <strong>Temperature:</strong> {temp ?? "- "}°C
          </p>
          <p>
            <strong>Humidity:</strong> {humidity ?? "- "}%
          </p>
          <p>
            <small>
              Updated:{" "}
              {new Date(weather.temperature?.recordTime).toLocaleString()}
            </small>
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
