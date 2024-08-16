import React from "react";

function WeatherBox({ weather }) {
  return (
    <div className="weather-box">
      {weather && weather.main ?
      (
        <>
      <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp}°C /{" "}
        {Math.ceil((weather?.main.temp * 1.8 + 32) * 100) / 100}°F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
      </>):(<p>No weather data available</p>)}
    </div>
  );
}

export default WeatherBox;
