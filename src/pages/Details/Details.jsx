import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header';
import './Details.scss'

function Details() {
    const [weatherData, setWeatherData] = useState([]);
    const [userData, setUserData] = useState([]);

    async function getWeatherData() {
        const response = await axios.get("http://localhost:8080/weather/notApplied");
        setWeatherData(response.data[0])
    }

    async function getUserData() {
    const response = await axios.get("http://localhost:8080/users");
    setUserData(response.data[0])
    }
    console.log(userData);

    useEffect(() => {
        getWeatherData();
        getUserData();
    }, [])



  return (
    <div className='details'>
        <Header/>
        <div className="details__wrap">
            <h1 className="details__accounts-title">Profile</h1>
            <div className="details__acc-data-wrap">
                <p className="details__name">Country: {weatherData.country}</p>
                <p className="details__name">City: {weatherData.city}</p>
                <p className="details__name">Name: {userData.name}</p>
                <p className="details__name">Email: {userData.email}</p>
                <p className="details__name">Password: pass</p>
            </div>
            <h1 className="details__weather-title">Weather</h1>
            <div className="details__weather-data-wrap">
                <p className="details__name">Description: {weatherData.description}</p>
                <p className="details__name">Temperature: {weatherData.temperature}C</p>
                <p className="details__name">UVI: {weatherData.UVI}</p>
            </div>
        </div>
    </div>
  )
}

export default Details