import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const url = "https://open-weather13.p.rapidapi.com/city/";
  const apiKey = import.meta.env.VITE_WEATHER_KEY;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();

  const getWeatherStats = async () => {
    try {
      const response = await fetch(url + `${city}/EN`, options);
      const result = await response.json();
      setWeather(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setCity("");

    getWeatherStats();
  };

  const fahrenheitToCelsius = (fahrenheit) => {
    let celsius = ((fahrenheit - 32) * 5) / 9;
    return Math.round(celsius);
  };

  return (
    <form className="weather-board" onSubmit={handleOnSubmit}>
      <div>
        <input
          placeholder="Search for city"
          type="text"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
      </div>
      {weather && (
        <div>
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>
            {weather.weather[0].main}
            {", "}
            {`${fahrenheitToCelsius(weather.main.temp)}°C`}
          </p>
          <p>Temp MIN: {`${fahrenheitToCelsius(weather.main.temp_min)}°C`} </p>
          <p>Temp MAX: {`${fahrenheitToCelsius(weather.main.temp_max)}°C`} </p>
          <p>Pressure: {weather.main.pressure} hPa</p>
          <p>Humidity: {weather.main.humidity} %</p>
        </div>
      )}
    </form>
  );
};

export default Weather;
