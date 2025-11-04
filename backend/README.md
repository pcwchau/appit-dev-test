# HKO Weather Proxy

This small project runs an Express server that proxies the Hong Kong Observatory (HKO) current weather endpoint (rhrread) and exposes it at /weather.

Quick start (Windows PowerShell):

1. Install dependencies

```powershell
npm install
```

2. Start the server

```powershell
npm start
```

3. Fetch the proxied weather

```powershell
# Use Invoke-RestMethod to get JSON
Invoke-RestMethod -Uri http://localhost:3000/weather
```

The server listens on port 3000 by default (configure with the PORT environment variable).

Notes:
- The server proxies the HKO API at: https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en
- Responses are cached briefly (Cache-Control: public, max-age=60).
# appit-dev-test