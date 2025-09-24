import React, { useState } from 'react';
import "./WeatherApp.css";

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '2873155d3f284c9287d64807252409';

    const getWeather = (e) => {
        e.preventDefault();

        if (!city) {
            setError('Please enter a city name');
            setWeather(null);
            return;
        }

        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setWeather(null);
                    setError('City not found or error fetching data.');
                } else {
                    setWeather(data);
                    setError('');
                }
            })
            .catch(() => {
                setWeather(null);
                setError('City not found or error fetching data.');
            });
    };
    return (
        <div className="weather-container">
            <h1 className="weather-title">🌤️ Weather App</h1>

            <form className="weather-form" onSubmit={getWeather}>
                <input
                    className="weather-input"
                    type="text"
                    placeholder="Enter city (e.g., London)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className="weather-button" type="submit">Get Weather</button>
            </form>

            {error && <p className="weather-error">{error}</p>}

            {weather && (
                <div className="weather-card">
                    <h2>
                        {weather.location.name}, {weather.location.country}
                    </h2>
                    <img
                        src={weather.current.condition.icon}
                        alt="weather icon"
                        className="weather-icon"
                    />
                    <h3>{weather.current.condition.text}</h3>
                    <p className="weather-temp">🌡️ {weather.current.temp_c}°C</p>
                    <p>💧 Humidity: {weather.current.humidity}%</p>
                    <p>💨 Wind: {weather.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
