import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import sunnyImage from './resources/sunny-weather.jpg';
import rainyImage from './resources/rainy-weather.jpg';
import snowyImage from './resources/snowy-weather.jpg';
import cloudyImage from './resources/cloudy-weather.jpg';
import thunderImage from './resources/lightning_jpg-8.jpg';
import drizzleImage from './resources/drizzle.jpg';
import fogImage from './resources/fog.jpg';

function App() {
  const [data, setData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(sunnyImage);
  const [iconUrl, setIconUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [units, setUnits] = useState('imperial');

  const apiKey = process.env.REACT_APP_API_KEY;

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
      case 'Mist':
      case 'Haze':
        return fogImage;
      default:
        return cloudyImage;
    }
  };

  const formatHour = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const fetchWeatherForCity = useCallback(async (cityName) => {
    const trimmedLocation = cityName.trim();

    if (!trimmedLocation) {
      setErrorMessage('Enter a city name to search for weather.');
      return;
    }

    if (!apiKey) {
      setErrorMessage('Missing API key. Set REACT_APP_API_KEY in your environment.');
      return;
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedLocation)}&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(trimmedLocation)}&units=${units}&appid=${apiKey}`;

    try {
      setIsLoading(true);
      setErrorMessage('');
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl),
      ]);

      if (weatherResponse?.data?.weather?.[0]) {
        setData(weatherResponse.data);
        const iconCode = weatherResponse.data.weather[0].icon;
        setIconUrl(`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
        setDescription(weatherResponse.data.weather[0].description || 'No description available');
        setBackgroundImage(getBackgroundImage(weatherResponse.data.weather[0].main));
      }

      const nextHours = (forecastResponse?.data?.list || []).slice(0, 6).map((item) => ({
        id: item.dt,
        time: formatHour(item.dt),
        temp: Math.round(item.main.temp),
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        condition: item.weather[0].main,
        precipitation: Math.round((item.pop || 0) * 100),
      }));

      setHourlyForecast(nextHours);
      setLastQuery(trimmedLocation);
    } catch (error) {
      setData(null);
      setHourlyForecast([]);
      setIconUrl('');
      setDescription('');
      setBackgroundImage(cloudyImage);
      setErrorMessage('Could not fetch weather for that location. Try another city.');
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
      setLocation('');
    }
  }, [apiKey, units]);

  const searchLocation = async () => {
    await fetchWeatherForCity(location);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  useEffect(() => {
    if (lastQuery) {
      fetchWeatherForCity(lastQuery);
      return;
    }
    setBackgroundImage(sunnyImage);
  }, [lastQuery, fetchWeatherForCity]);

  const isWeatherLoaded = Boolean(data?.name);
  const condition = data?.weather?.[0]?.main || 'Weather';
  const unitSymbol = units === 'imperial' ? 'F' : 'C';
  const windUnit = units === 'imperial' ? 'mph' : 'm/s';
  const visibilityValue = units === 'imperial'
    ? `${(data?.visibility / 1609).toFixed(1)} mi`
    : `${(data?.visibility / 1000).toFixed(1)} km`;

  return (
    <div
      className="app"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(8, 27, 47, 0.75), rgba(0, 0, 0, 0.55)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <main className="weather-shell">
        <header className="hero">
          <p className="eyebrow">Live Forecast</p>
          <h1>Weather Radar</h1>
          <p className="hero-subtitle">Instant city conditions with a cleaner, modern dashboard.</p>
        </header>

        <div className="search" role="search">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search city (e.g., Lagos)"
            type="text"
            aria-label="Search city weather"
          />
          <button type="button" onClick={searchLocation} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Get Weather'}
          </button>
        </div>

        <div className="unit-toggle" role="group" aria-label="Temperature units">
          <button
            type="button"
            className={units === 'imperial' ? 'active' : ''}
            onClick={() => setUnits('imperial')}
            disabled={isLoading}
          >
            F
          </button>
          <button
            type="button"
            className={units === 'metric' ? 'active' : ''}
            onClick={() => setUnits('metric')}
            disabled={isLoading}
          >
            C
          </button>
        </div>

        {errorMessage && <p className="status error">{errorMessage}</p>}

        {!isWeatherLoaded && !errorMessage && (
          <section className="empty-state">
            <p>Search for a city to see current temperature, conditions, humidity, and wind speed.</p>
          </section>
        )}

        {isWeatherLoaded && (
          <section className="container">
            <div className="top">
              <div className="location-row">
                <p className="location">{data.name}, {data.sys?.country}</p>
                <span className="condition-pill">{condition}</span>
              </div>

              <div className="temp-block">
                <p className="temp">{Math.round(data.main?.temp)}
                  <span className="unit"> {unitSymbol}</span>
                </p>
                {iconUrl && <img src={iconUrl} alt={description || condition} />}
              </div>

              <p className="description">{description}</p>
            </div>

            <div className="bottom">
              <div className="metric">
                <p className="label">Feels Like</p>
                <p className="value">{Math.round(data.main?.feels_like)} {unitSymbol}</p>
              </div>
              <div className="metric">
                <p className="label">Humidity</p>
                <p className="value">{Math.round(data.main?.humidity)}%</p>
              </div>
              <div className="metric">
                <p className="label">Wind Speed</p>
                <p className="value">{Math.round(data.wind?.speed)} {windUnit}</p>
              </div>
              <div className="metric">
                <p className="label">Visibility</p>
                <p className="value">{visibilityValue}</p>
              </div>
            </div>

            {hourlyForecast.length > 0 && (
              <div className="hourly">
                <div className="hourly-header">
                  <p className="hourly-title">Next Hours</p>
                  <p className="hourly-subtitle">3-hour forecast snapshots</p>
                </div>

                <div className="hourly-list">
                  {hourlyForecast.map((item) => (
                    <article className="hour-card" key={item.id}>
                      <p className="hour-time">{item.time}</p>
                      <img src={item.icon} alt={item.condition} />
                      <p className="hour-temp">{item.temp} {unitSymbol}</p>
                      <p className="hour-condition">{item.condition}</p>
                      <p className="hour-rain">Rain {item.precipitation}%</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
