# React Weather App

Modern React weather dashboard with live current conditions, hourly forecast cards, weather-based backgrounds, and unit toggle support.

## Features

- Search weather by city name
- Dynamic weather background imagery
- Hourly forecast snapshots with rain chance
- Celsius/Fahrenheit toggle
- Responsive UI for desktop and mobile

## Tech Stack

- React (Create React App)
- Axios
- OpenWeather API

## Local Setup

1. Clone the repository:
	git clone https://github.com/Chukwu12/weather-app-react.git
2. Enter the project folder:
	cd weather-app-react
3. Install dependencies:
	npm install
4. Add environment variable in a .env file:
	REACT_APP_API_KEY=your_openweather_api_key
5. Start the app:
	npm start
6. Open http://localhost:3000

## Netlify Deployment (Step by Step)

This repository is now configured for Netlify using [netlify.toml](netlify.toml).

1. Push your latest code to GitHub.
2. In Netlify, click Add new site -> Import an existing project.
3. Connect GitHub and choose Chukwu12/weather-app-react.
4. Build settings should auto-detect:
	- Build command: npm run build
	- Publish directory: build
5. In Netlify Site settings -> Environment variables, add:
	- REACT_APP_API_KEY = your_openweather_api_key
6. Trigger deploy.
7. Open the Netlify URL after deploy completes.

## Notes

- SPA routing fallback is configured in [netlify.toml](netlify.toml) with a redirect to index.html.
- If you previously used GitHub Pages, no gh-pages script is required anymore.

