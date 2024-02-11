import React, { useState } from 'react';
import axios from 'axios';
import sunnyImage from '../src/resources/sunny-weather.jpg'; // Import background images
import rainyImage from '../src/resources/rainy-weather.jpg';
import snowyImage from '../src/resources/snowy-weather.jpg';
import cloudyImage from '../src/resources/cloudy-weather.jpg';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null); // State for background image

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=b710b20aa3d46f59289723c99fe79c9c`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        setBackgroundImage(getBackgroundImage(response.data.weather[0].main)); // Set background image
      });
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
      default:
        return null; // Default background image
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">{data.main && <h1>{data.main.temp.toFixed()}°F</h1>}</div>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
