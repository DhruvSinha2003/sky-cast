import React from "react";
import "./DisplayWeather.css";
import { AiOutlineSearch } from "react-icons/ai";
import {
  WiHumidity,
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiFog,
} from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import "react-dotenv";
import axios from "axios";

interface WeatherProps {
  name: string;

  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather = () => {
  const key = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = React.useState<WeatherProps | null>(
    null
  );

  const [loading, setLoading] = React.useState<boolean>(false);

  const [search, setSearch] = React.useState<string>("");

  const fetchWeather = async (lat: number, lon: number) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      const searchResponse = await axios.get(url);
      const currentSearchResults: WeatherProps = searchResponse.data;
      return { currentSearchResults };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleSearch = async () => {
    if (search.trim() === "") {
      return;
    }
    try {
      const { currentSearchResults } = await fetchWeatherByCity(search);
      setWeatherData(currentSearchResults);
    } catch (err) {
      console.log(err);
    }
  };

  const iconChanger = (weather: string) => {
    if (weather === "Clear") {
      return <WiDaySunny />;
    } else if (weather === "Clouds") {
      return <WiCloudy />;
    } else if (weather === "Rain") {
      return <WiRain />;
    } else if (weather === "Mist") {
      return <WiFog />;
    } else {
      return <TiWeatherPartlySunny />;
    }
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!weatherData) {
          Promise.all([fetchWeather(latitude, longitude)]).then(([weather]) => {
            setWeatherData(weather);
            setLoading(true);
          });
        }
      },
      (error) => console.error(error)
    );
  }, []);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a location."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="search-circle">
          <AiOutlineSearch className="search-icon" onClick={handleSearch} />
        </div>
      </div>
      {weatherData && loading ? (
        <>
          <div className="weather">
            <h1 className="location">{weatherData.name}</h1>
            <span>{weatherData.sys.country}</span>
            <div className="weather-icon">
              {iconChanger(weatherData.weather[0].main)}
            </div>
          </div>
          <div className="temperature">
            <h1>{weatherData.main.temp}°C</h1>
            <h2>{weatherData.weather[0].main}</h2>
          </div>
          <div className="info">
            <div className="humidity">
              <WiHumidity className="info-icon" />
              <div className="more-info">
                <h1>{weatherData.main.humidity}%</h1>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <SiWindicss className="info-icon" />
              <div className="more-info">
                <h1>{weatherData.wind.speed}km/h</h1>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <RiLoaderFill className="loadingIcon" />
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default DisplayWeather;