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
  const [weather, setWeather] = React.useState<WeatherProps | null>(null);
  const fetchWeather = async (lat: number, lon: number) => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${key}`;
  const response = await axios.get(url);
  return response.data;
};

  React.useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const {latitude, longitude} = position.coords;
      Promise.all([fetchWeather(latitude, longitude)]).then(
        ([weather])=>{
            console.log(weather);
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
      <div className="weather">
        <h1 className="location">Location</h1>
        <span>IN</span>
        <div className="weather-icon">ICON</div>
      </div>
      <div className="temperature">
        <h1>25°C</h1>
        <span>Cloudy</span>
      </div>
      <div className="info">
        <div className="humidity">
          <WiHumidity className="info-icon" />
          <div className="more-info">
            <h1>60%</h1>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <SiWindicss className="info-icon" />
          <div className="more-info">
            <h1>2.56 km/hr</h1>
            <p>wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeather;
