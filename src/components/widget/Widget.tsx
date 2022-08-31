
import "./Widget.scss"
import { useCitiesReq } from "../../Servises/citiesReq"
import { weatherData } from '../../interfaces/WeatherDataT'
import { useData } from '../../hooks/data.hook'

import humidity from "../../assets/drop-silhouette.png"
import windSpeed from "../../assets/wind-solid.svg"
import gear from "../../assets/gear-solid.svg"
import { useEffect, useState } from 'react'

const Widget = () => {
  const ls = window.localStorage
  let lsData:weatherData[] = []
  const { getCoords } = useCitiesReq()
  let [cities, setCities] = useState<weatherData[]>([])
  const getIconSrc = (iconCode: string) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  useEffect(() => {
    getCoords()
    lsData = JSON.parse(ls.getItem("wData") || "")
    setCities(() => cities = lsData)
  }, [])

    return (
        <div className="widget">
          <div className="widget__menu">
            <div className="widget__city"><span className="widget__city-name">{cities[0].city}</span>, {cities[0].country}</div>
            <button className="widget__settings-btn">
              <img className="widget__settings-img" src={gear} alt="gear" />
            </button>
          </div>

          <div className="widget__temp">
            <div className="widget__temp-row">
              <div className="widget__weather-description">{cities[0].desc}</div>
            </div>
            <div className="widget__temp-row">
              <img className="widget__temp-img" src={getIconSrc(cities[0].icon)} alt='weather icon' />
              <div className="widget__display-temp">{cities[0].temp}°</div>
            </div>
          </div>

          <div className="widget__weather-params">
            <div className="widget__weather-params-item">feels like: {cities[0].feels_like}°</div>
            <div className="widget__weather-params-item">
              <img className="widget__weather-img" src={humidity} alt="humidity" />
              <span> {cities[0].humidity} %</span>
            </div>
            <div className="widget__weather-params-item">
              <img className="widget__weather-img" src={windSpeed} alt="wind speed" />
              <span>{cities[0].wind}  m/s</span>
            </div>
          </div>
      </div>

    )
}

export default Widget