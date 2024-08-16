import React from "react";
import { Button } from "react-bootstrap";
import "../App.css";

function WeatherButton({ cities, setCity, handleCityChange, selectedCity }) {
  return (
    <div>
      <Button
        variant="warning"
        className={selectedCity === "" ? "selected-button" : ""}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button variant="warning" className={selectedCity === item ? "selected-button" : ""}
        key={index} onClick={() => setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  );
}

export default WeatherButton;
