# Weather App React

<p align="center">
	A modern React weather dashboard with real-time conditions, hourly forecast cards, dynamic backgrounds, and unit switching.
</p>

<p align="center">
	<a href="https://oniceweatherapp.netlify.app/">
		<img src="https://img.shields.io/website?url=https%3A%2F%2Foniceweatherapp.netlify.app%2F&up_message=Live%20Demo&down_message=Offline&label=App&logo=netlify" alt="Live Demo" />
	</a>
	<br />
	<img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
	<img src="https://img.shields.io/badge/Create%20React%20App-5.0.1-09D3AC?logo=createreactapp&logoColor=white" alt="Create React App" />
	<img src="https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?logo=axios&logoColor=white" alt="Axios" />
	<img src="https://img.shields.io/badge/OpenWeather-API-EB6E4B?logo=openweathermap&logoColor=white" alt="OpenWeather API" />
	<img src="https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify&logoColor=white" alt="Netlify" />
</p>

<p align="center">
	<a href="https://oniceweatherapp.netlify.app/">View Live App</a>
</p>

## Highlights

- 🔎 Search weather by city name
- 🌤️ Dynamic weather-based background imagery
- 🕒 Hourly forecast snapshots with rain chance
- 🌡️ Celsius/Fahrenheit unit toggle
- 📱 Responsive layout for desktop and mobile

## Tech Stack

- React 18 (Create React App)
- Axios
- OpenWeather API
- Netlify (deployment)

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/Chukwu12/weather-app-react.git
cd weather-app-react
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root:

```bash
REACT_APP_API_KEY=your_openweather_api_key
```

### 3. Run locally

```bash
npm start
```

Open `http://localhost:3000`.

## Scripts

```bash
npm start    # Run development server
npm run build # Build production bundle
npm test     # Run tests
```

## Netlify Deployment

This repository is already configured for Netlify using [netlify.toml](netlify.toml).

1. Push your latest code to GitHub.
2. In Netlify: `Add new site` -> `Import an existing project`.
3. Connect GitHub and select `Chukwu12/weather-app-react`.
4. Confirm build settings:
	 - Build command: `npm run build`
	 - Publish directory: `build`
5. In `Site settings` -> `Environment variables`, add:
	 - `REACT_APP_API_KEY=your_openweather_api_key`
6. Trigger deploy and open your Netlify URL.

## Notes

- SPA fallback redirect is configured in [netlify.toml](netlify.toml): all routes point to `index.html`.
- No `gh-pages` setup is needed when deploying via Netlify.

