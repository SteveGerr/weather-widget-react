// import { useState, useEffect } from 'react';
import "./Widget.scss"

import humidity from "../../assets/drop-silhouette.png"
import windSpeed from "../../assets/wind-solid.svg"
import gear from "../../assets/gear-solid.svg"

const Widget = () => {


    return (
        <div className="widget">
          <div className="widget__menu">
            <div className="widget__city"><span className="widget__city-name">city.cty</span>, city.country</div>
            <button className="widget__settings-btn">
              <img className="widget__settings-img" src={gear} alt="gear" />
            </button>
          </div>

          <div className="widget__temp">
            <div className="widget__temp-row">
              <div className="widget__weather-description"> city.desc</div>
            </div>
            <div className="widget__temp-row">
              <img className="widget__temp-img" alt='' />
              <div className="widget__display-temp">city.temp°</div>
            </div>
          </div>

          <div className="widget__weather-params">
            <div className="widget__weather-params-item">feels like: city.feels_like°</div>
            <div className="widget__weather-params-item">
              <img className="widget__weather-img" src={humidity} alt="humidity" />
              <span> city.humidity %</span>
            </div>
            <div className="widget__weather-params-item">
              <img className="widget__weather-img" src={windSpeed} alt="wind speed" />
              <span>city.wind  m/s</span>
            </div>
          </div>
      </div>

    )
}

export default Widget