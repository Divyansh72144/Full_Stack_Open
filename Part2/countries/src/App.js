import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching countries:", error);
      });
  }, []);

  const api = {
    weatherKey: process.env.REACT_APP_WEATHER_KEY,
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const fetchWeatherData = (country) => {
    fetch(
      `${api.base}weather?q=${country.capital[0]}&units=metric&APPID=${api.weatherKey}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeatherData(result);
        console.log(result);
      });
  };
  const handleSearchQuery = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setSelectedCountry(null);

    if (query.length === 0) {
      setFeedbackMessage("");
      setSearchResults([]);
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      );

      if (filtered.length > 10) {
        setFeedbackMessage("Too many matches, specify another filter");
        setSearchResults([]);
      } else {
        setSearchResults(filtered);

        if (filtered.length === 1) {
          setSelectedCountry(filtered[0]);
          fetchWeatherData(filtered[0]);
        }

        setFeedbackMessage("");
      }
    }
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeatherData(country);
  };

  const countryData = selectedCountry !== null && (
    <div>
      <h1>{selectedCountry.name.common}</h1>
      Capital {selectedCountry.capital}
      <br />
      Area {selectedCountry.area}
      <br />
      <div>
        All languages
        <ul>
          {Object.values(selectedCountry.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>Flag {selectedCountry.flag}</div>
      <h1>Weather</h1>
      {weatherData && (
        <div>
          Temperature: {weatherData.main.temp}°C
          <br />
          Description: {weatherData.weather[0].description}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <input
        value={searchQuery}
        onChange={handleSearchQuery}
        placeholder="Search for a country..."
      />

      {feedbackMessage && <div>{feedbackMessage}</div>}

      {searchResults.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          {searchResults.length > 1 && (
            <button onClick={() => handleShowCountry(country)}>
              Show Country
            </button>
          )}
        </div>
      ))}
      {countryData}
    </div>
  );
};

export default App;
