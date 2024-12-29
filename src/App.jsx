import { useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from "./components/WeatherCard.jsx";


function App() {
  const search = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${import.meta.env.VITE_APP_ID}`;

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

    } catch (err) {

    }
  }

  return (
    <>
    <div className="weather-card">
      <WeatherCard></WeatherCard>
    </div>
    </>
  )
}

export default App
