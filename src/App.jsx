import { useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from "./components/WeatherCard.jsx";


function App() {

  return (
    <>
    <div className="weather-card">
      <WeatherCard></WeatherCard>
    </div>
    </>
  )
}

export default App
