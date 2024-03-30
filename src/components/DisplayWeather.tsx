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
import { count } from "console";

interface WeatherProps {
    name:string

    main:{
        temp:number,
        humidity:number,
    },
    sys:{
        country:string,
    },
    weather:{
        main:string,
    }[],
    wind:{
        speed:number,
    },  
}


const DisplayWeather = () => {

  const key = process.env.REACT_APP_API_KEY;
  const [weatherData, setWeatherData] = React.useState<WeatherProps | null>(null);
  
  const fetchWeather = async (lat: number, lon: number) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const iconChanger =  (weather:string) => {
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
  }
  

  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude} = position.coords;
      Promise.all([fetchWeather(latitude, longitude)]).then(
        ([weather])=>{
            setWeatherData(weather);
            })
        })
  })
  
  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a location."
        />
        <div className="search-circle">
          <AiOutlineSearch className="search-icon" />
        </div>
      </div>
      {weatherData && (
        <>
        <div className="weather">
        <h1 className="location">{weatherData.name}</h1>
        <span>{weatherData.sys.country}</span>
        <div className="weather-icon">{iconChanger(weatherData.weather[0].main)}</div>
      </div>
      <div className="temperature">
        <h1>{weatherData.main.temp}</h1>
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
            <p>wind Speed</p>
          </div>
        </div>
      </div>
        </>
      )}
      
    </div>
  );
};

export default DisplayWeather;
