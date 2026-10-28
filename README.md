# Draftwise Freelance Studio

A responsive freelance proposal analyzer built with React, Vite, JavaScript, Bootstrap, React Router, Axios, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

Use `npm run build` to create a production bundle and `npm run lint` to run Oxlint.

## Demo

Open `/login` and sign in with any valid email and password. Registration is also available; demo authentication is stored in the browser and does not contact a server. Profile details, preferences, and analysis history use local storage with realistic starter records.

## API configuration

The Axios client is ready in `src/services/api.js`. Set `VITE_API_URL` in a local `.env` file when connecting a backend. No API, database, or AI service is currently required to use the demo.

## Backend

The standalone Express API is in [backend/README.md](backend/README.md). Run `npm install` and `npm run dev` from `backend/`; it listens on port `5001` by default. The React demo still uses local mock data and has not been connected to these endpoints.
