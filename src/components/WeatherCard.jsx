function WeatherCard() {

  return (
    <div className="container">
      <div className="search-container">
        <form>
          <input className="search-input" type="search" placeholder="Enter a city name"></input>
        </form>
        <button className="search-button">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="weather-container">
        <div className="weather">
          <img src="./src/assets/weather-icons/clear.svg" className="weather-icon" />
          <h2 className="temperature">20°C</h2>
          <span className="description">Partly Cloudy</span>
        </div>

      </div>
    </div>
    
  )
}

export default WeatherCard;