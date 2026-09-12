# Keshav Portfolio

## Run locally

```powershell
npm install
npm run dev
```

Open the Local URL printed by Vite in your browser. It will use port 5180 when available, or the next available port if 5180 is busy. Do not open `frontend/index.html` by double-clicking it, because the React module entry must be served by Vite.

The project is organized into `frontend/` for React/Vite and `backend/` for the Gemini API server.

To run the portfolio and chatbot API together:

```powershell
npm run dev:all
```

## Production build

```powershell
npm run build
npm run preview
```

## Deploy

This project can deploy as one Node service on Render, Railway, or Fly.io.

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Environment variable: `GEMINI_API_KEY=your_key`
- Optional environment variable: `API_PORT` (the hosting platform provides `PORT`; use the platform's port if required)

The backend serves the compiled React app from `dist/` and handles `/api/chat`.

### Netlify

Netlify should use the repository root as its base directory. The included `netlify.toml` sets:

- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Functions directory: `netlify/functions`
- Environment variable: `GEMINI_API_KEY=your_key`

The `/api/chat` route is redirected to the `chat` Netlify Function. The function calls Gemini server-side, so the API key is never bundled into the frontend.

If Netlify still shows `Current directory: /opt/build/repo/frontend`, clear the Base directory field in Site configuration, then redeploy. The `react-icons` dependency is installed from the root `package.json`.
