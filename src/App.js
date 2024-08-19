import React, { useState } from 'react';
import axios from 'axios';
import sunnyImage from '../src/resources/sunny-weather.jpg'; // Import background images
import rainyImage from '../src/resources/rainy-weather.jpg';
import snowyImage from '../src/resources/snowy-weather.jpg';
import cloudyImage from '../src/resources/cloudy-weather.jpg';
import thunderImage from '../src/resources/lightning_jpg-8.jpg';
import drizzleImage from '../src/resources/drizzle.jpg';
import fogImage from '../src/resources/fog.jpg';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null); // State for background image
  const [iconUrl, setIconUrl] = useState(''); // State for weather icon URL
  const [description, setDescription] = useState(''); // State for weather description

  const apiKey = process.env.REACT_APP_API_KEY; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`; // Use apiKey in the URL

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        const iconCode = response.data.weather[0].icon; // Get the icon code
        setIconUrl(`http://openweathermap.org/img/wn/${iconCode}.png`); // Construct the icon URL
        setDescription(response.data.weather[0].description); // Set weather description
        setBackgroundImage(getBackgroundImage(response.data.weather[0].main)); // Set background image
      })
      .catch(error => console.error("Error fetching weather data:", error));
      setLocation('');
    }
  };

  // Function to get background image based on weather condition
  const getBackgroundImage = (weather) => {
    switch (weather) {
      case 'Rain':
        return rainyImage;
      case 'Snow':
        return snowyImage;
      case 'Clear':
        return sunnyImage;
      case 'Clouds':
        return cloudyImage;
      case 'Thunderstorm':
      return thunderImage; 
      case 'Drizzle':
        return drizzleImage;
      case 'Fog':
        return fogImage; 
      case 'Mist':
        return 'path/to/mist-image.jpg';
      case 'Haze':
        return 'path/to/haze-image.jpg'; 
      case 'Dust':
        return 'path/to/dust-image.jpg'; 
      case 'Sand':
        return 'path/to/sand-image.jpg'; 
      case 'Ash':
        return 'path/to/ash-image.jpg'; 
      case 'Squall':
        return 'path/to/squall-image.jpg'; 
      case 'Tornado':
        return 'path/to/tornado-image.jpg'; 
      default:
        return null; // Default background image
    }
  };

  return (
    <div
    className="app"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', // Adjust background image size
      backgroundRepeat: 'no-repeat', // Prevent background image repetition
      backgroundPosition: 'center', // Center the background image
    }}
  >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation} // Updated to onKeyDown
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main && <h1>{data.main.temp.toFixed()}°F</h1>}
          {iconUrl && <img src={iconUrl} alt="Weather Icon" />} {/* Display the weather icon */}</div>
          <div className="description">{data.weather && <p>{data.weather[0].main}</p>}</div>
        </div>
        

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main && <p className="bold">{data.main.feels_like.toFixed()}°F</p>}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind && <p className="bold">{data.wind.speed.toFixed()} MPH</p>}
              <p>Wind Speed</p>
            </div>

            <div className="description">
              <p>   {data.weather && <p>{description}</p>} {/* Display the weather description */}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
