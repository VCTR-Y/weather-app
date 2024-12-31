import { useEffect, useState } from "react";
import clearD_icon from "../assets/weather-icons/sunny.svg"
import clearN_icon from "../assets/weather-icons/clear.svg"
import partlyD_icon from "../assets/weather-icons/partly_cloudy.svg"
import partlyN_icon from "../assets/weather-icons/partly_clear.svg"
import cloudy_icon from "../assets/weather-icons/cloudy.svg"
import showers_icon from "../assets/weather-icons/scattered_showers.svg"
import rain_icon from "../assets/weather-icons/showers.svg"
import thunder_icon from "../assets/weather-icons/strong_tstorms.svg"
import snow_icon from "../assets/weather-icons/snow_showers.svg"
import fog_icon from "../assets/weather-icons/fog.svg"

function WeatherCard() {

  const [weatherData, setWeatherData] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    search("Vancouver")
  }, []);

  const icons = {
    "01d": clearD_icon,
    "01n": clearN_icon,
    "02d": partlyD_icon,
    "02n": partlyN_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": cloudy_icon,
    "04n": cloudy_icon,
    "09d": showers_icon,
    "09n": showers_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunder_icon,
    "11n": thunder_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": fog_icon,
    "50n": fog_icon,
  }

  const fetchSuggestions = async (query) => {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
  
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching city suggestions:", err);
    }
  }

  const handleInputChange = (e) => {
    const query = e.target.value;
    if (query) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name},${suggestion.country}`;
    setSuggestions([]);
    search(cityName);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.querySelector(".search-input");
    search(input.value);
  }

  const search = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const updatedWeatherData = {
          temperature: Math.round(data.main.temp),
          description: data.weather[0].main,
          icon: icons[data.weather[0].icon],
          city: data.name,
          country: data.sys.country
        }
        
        setWeatherData(updatedWeatherData);

    } catch (err) {
      alert("Invalid City Name")
    }
  }

  return (
    <div className="container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input className="search-input" type="search" placeholder="Enter a city name" onChange={handleInputChange}></input>
          <button className="search-button" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestion-item"
              >
                {suggestion.name}, {suggestion.state || ""} {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="weather-container">
        <div className="weather">
          <h1 className="city">{weatherData.city}, {weatherData.country}</h1>
          <img src={weatherData.icon} className="weather-icon" />
          <h2 className="temperature">{weatherData.temperature}°C</h2>
          <span className="description">{weatherData.description}</span>
        </div>

      </div>
    </div>
    
  )
}

export default WeatherCard;