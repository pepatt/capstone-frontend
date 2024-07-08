import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import title from '../../assets/images/title.png'

import clouds from '../../assets/images/clouds.png'
import sun from '../../assets/images/sun.png'
import rain from '../../assets/images/rain.png'
import sun_clouds from '../../assets/images/sun_clouds.png'

import temp_regular from '../../assets/icons/guage_regular.png'
import temp_high from '../../assets/icons/guage_high.png'
import temp_low from '../../assets/icons/guage_low.png'

import illustration_applied from '../../assets/images/illu_applied.png'
import illustration_not_applied from '../../assets/images/illu_not_applied.png'

import calendar from '../../assets/icons/calendar.png'
import friends from '../../assets/icons/friends.png'
import cross from '../../assets/icons/cross.png'
import { React, useState, useEffect } from 'react'

function Home() {
  const [isApplied, setIsApplied] = useState(false);
  const [weatherData, setWeatherData] =  useState([]);

  async function getWeatherData() {
    const response = await axios.get("http://localhost:8080/weather");
    setWeatherData(response.data[0])
  }
  console.log(weatherData);

  function toggleApply() {
    
    setIsApplied(!isApplied);
  }

  useEffect(() => {
    getWeatherData();
  }, [])


  return (
    <div className='home'>
      <div className="home__header">
        <div className="home__header-logo-wrap">
          <div className='home__header-logo-wrapper'>
            <img src={
                weatherData.description === "cloudy" 
                ? clouds 
                : weatherData.description === "clear sky"
                ? sun 
                : weatherData.description === "few clouds" 
                ? sun_clouds
                : clouds
            } alt="App Logo" className="home__header-logo" />
          </div>
        </div>
        <img className="home__header-title" src={title} alt="Title png" />
        <div className="home__header-temp-wrapper">
          <img src={
            weatherData.temperature > 25 
            ? temp_high 
            : weatherData.temperature > 15
            ? temp_regular 
            : weatherData.temperature <= 15 
            ? temp_low
            : temp_low
            } alt="Temp Icon" className="home__header-temp-icon" />
        </div>
      </div>
      <div className="home__body">
        <div className="home__body-illustration-wrap">
          <img src={illustration_not_applied} alt="body__illustration" className="home__body-illustration" />
        </div>
        <div className="home__two-icons-wrap">
          <Link to="/calendar" className="home__one-icon-wrap">
            <img src={calendar} alt="Calendar Icon" className="home__calendar-icon" />
          </Link>
          <Link to="/friends" className="home__one-icon-wrap">
            <img src={friends} alt="Friends Icon" className="home__friends-icon" />
          </Link>
        </div>
        <p className="home__body-suggestion">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia nemo dolorum voluptas nostrum consectetur. Officia.
        </p>
        <Link to="/details" className="home__details-link">Details</Link>

        {!isApplied 
        ?
        <button onClick={toggleApply} className="home__apply-btn">APPPLIED</button> 
        : 
                <div className="home__apply-btn-active">
                <p className="home__apply-btn-active-p">UVI: {weatherData.UVI}</p>
                <div className="home__apply-btn-cancel-wraper">
                  <div onClick={toggleApply} className="home__apply-btn-cancel-wrap">
                    <img src={cross} alt="Cancel Icon" className="home__apply-btn-cancel" />
                  </div>
                </div>
              </div>
        }

      </div>
    </div>
  )
}

export default Home