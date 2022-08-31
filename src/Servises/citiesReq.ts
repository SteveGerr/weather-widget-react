import { useState } from 'react';
import { useData } from '../hooks/data.hook';

const ls = window.localStorage

export const useCitiesReq = () => {

    let [city, setCity] = useState<any>()
    const {getData} = useData()

    const _API_key = "74c12883141c83cfc50a2134a0fbba7a"
    const _BASE_URL = 'https://api.openweathermap.org/data/2.5/'

    const getCoords = () => {
        const success = (d: any) => {

            const lat = d.coords.latitude
            const long = d.coords.longitude

            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`

            fetch(url)
              .then(res => res.json())
              .then(data => {

                ls.setItem("userCoord", data.city || data["localityInfo"]["administrative"][2].name)
                const uc = ls.getItem("userCoord") || ""
                setCity(() => city = uc)

                const URL = `${_BASE_URL}weather?q=${ uc }&units=metric&appid=${_API_key}`
                getData(URL)
              })
              .catch(error => console.error(error))
        }

        const error = () => {
            console.error("Get coords error");
        }

        navigator.geolocation.getCurrentPosition(success, error)
    }

    return { getCoords, getData }
}
