import { useState } from 'react'
import { weatherData } from "../interfaces/WeatherDataT"


export const useData = () => {
    const ls = window.localStorage
    let [weatherData, setWeatherData] = useState({})
    let [cities, setCities] = useState<weatherData[]>([])

    const isData = (data: any) => data ? true : false

    const getData = (url:string) => fetch(url)
    .then(res => res.json())
    .then(setData)
    .catch(error => console.error(error))

    const setData = (data: any) => {
      if (!isData(data)) return

      const {name, sys, main, wind: {speed}, weather, id} = data

      setWeatherData(() => {
          weatherData = {
            id,
            city: name,
            country: sys.country,
            feels_like: Math.round(main.feels_like),
            humidity: Math.round(main.humidity),
            pressure: main.pressure,
            temp: Math.round(main.temp),
            wind: Math.round(speed),
            icon: weather[0].icon,
            desc: weather[0].description
          }
      })

      if (ls.getItem("wData") !== null) {
        setCities(() => {
            return cities = [...JSON.parse(ls.getItem("wData") || "")]
        })
      } else {
        ls.setItem("wData", JSON.stringify([weatherData]))
        cities = [...JSON.parse(ls.getItem("wData") || "")]
      }
    }

    const setUpdateData = (data: any, citiesList:any) => {
        if (!isData(data)) return

        const {name, sys, main, wind: {speed}, weather, id} = data
        // Check city clone
        if (citiesList.find((c:any) => c.id === id)) return

        setWeatherData(() => {
            weatherData = {
              id,
              city: name,
              country: sys.country,
              feels_like: Math.round(main.feels_like),
              humidity: Math.round(main.humidity),
              pressure: main.pressure,
              temp: Math.round(main.temp),
              wind: Math.round(speed),
              icon: weather[0].icon,
              desc: weather[0].description
            }
        })


        const arr =  [...JSON.parse(ls.getItem("wData") || "")]
        arr.push(weatherData)
        ls.setItem("wData", JSON.stringify(arr))
        cities = [...JSON.parse(ls.getItem("wData") || "")]
    }


    return { getData, setData, cities, setUpdateData }
}