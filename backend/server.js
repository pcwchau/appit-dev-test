const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;
const HKO_URL =
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";

app.use(cors());

app.get("/weather", async (req, res) => {
  try {
    const place = "Hong Kong Observatory";
    const resp = await axios.get(HKO_URL, { timeout: 8000 });
    const data = resp.data;

    const observatoryTemp = data.temperature.data.find(
      (item) => item.place === place
    );
    const observatoryHum = data.humidity.data[0];

    const result = {
      place: place,
      temperature: observatoryTemp
        ? {
            value: observatoryTemp.value,
            unit: observatoryTemp.unit,
            recordTime: data.temperature.recordTime,
          }
        : null,
      humidity: observatoryHum
        ? {
            value: observatoryHum.value,
            unit: observatoryHum.unit,
            recordTime: data.humidity.recordTime,
          }
        : null,
    };
    res.json(result);
  } catch (err) {
    console.error(
      "Failed to fetch HKO data:",
      err && err.message ? err.message : err
    );
    res.status(502).json({ error: "Failed to fetch weather data from HKO" });
  }
});

app.listen(PORT, () => {
  console.log(`HKO proxy server listening on port ${PORT}`);
});
