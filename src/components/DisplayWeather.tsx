import React from "react";
import "./DisplayWeather.css";
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";

const DisplayWeather = () => {
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
          <span>CO</span>
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
