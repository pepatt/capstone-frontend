import { React, useState, useEffect } from 'react'
import axios from 'axios'

function Details() {
    const [weatherData, setWeatherData] = useState([""]);
    const [UvData, setUvData] = useState(0);

    async function getWeather() {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${import.meta.env.VITE_BC_VAN_LAT}&lon=${import.meta.env.VITE_BC_VAN_LON}&units=metric&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
        setWeatherData(response.data);
    }

    async function getUv() {
        const response = await axios.get("https://currentuvindex.com/api/v1/uvi?latitude=49.2608724&longitude=-123.113952");
        setUvData(response.data.now.uvi);
    }

    useEffect(() => {
        getWeather();
        getUv();
    }, [])



  return (
    <>
        <div>Details</div>
        <br></br>
        <p>{weatherData.name}</p>
        <br></br>
        <p>{UvData}</p>
    </>
  )
}

export default Details