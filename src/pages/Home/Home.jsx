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
import { DateTime, Interval } from 'luxon';


function Home() {
  const [weatherData, setWeatherData] =  useState([]);

  const today = DateTime.local();
  const firstDayOfActiveMonth=today.startOf('month');
    const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  ).splitBy({day: 1}).map(day => day.start);

  const dateData = {
    created_at_day: daysOfMonth[0].c.day,
    created_at_month: daysOfMonth[0].c.month,
    created_at_year: daysOfMonth[0].c.year
  }


  async function getWeatherData() {
    const response = await axios.post("http://localhost:8080/weather/notApplied", dateData);
    setWeatherData(response.data[0])
  }


async function apply() {
  const response = await axios.post("http://localhost:8080/weather/applied", dateData);
  setWeatherData(response.data[0]);
}

async function cancelApply() {
  const response = await axios.post("http://localhost:8080/weather/notApplied", dateData);
  setWeatherData(response.data[0]);
}


  useEffect(() => {
    getWeatherData();
  }, [])

  console.log(weatherData);


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
                : weatherData.description === "raining"
                ? rain
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

      <div className="home__content-wrap">
        <div className="home__body">
          <div className="home__body-illustration-wrap">
            <img src={ weatherData.isApplied === 0
              ? illustration_not_applied
              : weatherData.isApplied === 1
              ? illustration_applied
              : illustration_not_applied
              } alt="body__illustration" className="home__body-illustration" />
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
            {             
              weatherData.description === "cloudy" 
                  ? "Expect to see some clouds. "
                  : weatherData.description === "clear sky"
                  ? "The sun is out today."
                  : weatherData.description === "few clouds" 
                  ? "Partially sunny, stay away from direct sunlight. "
                  : weatherData.description === "raining"
                  ? "Bring an umbrella outside! "
                  : clouds
            } 
            {
              weatherData.UVI > 8 ? (
                <p>
                Avoid being outside today from 10AM to 3PM the sun is exceptionally dangerous producing a UV index of <span className='span'>{weatherData.UVI}</span>. Sunscreen application is mandatory.
                </p>
              )
              : weatherData.UVI > 6 ? (
              <p>
                Wear a hat and or sunglasses outside to protect your eyes and skin. The UV index is exceptionally high at <span className='span'>{weatherData.UVI}</span> so sunscreen application is mandatory.
              </p>
              )
              : weatherData.UVI > 4 ? (
                <p>
                  Make sure to apply sunscreen and stay in the shade especially during the midday. The UV index is very high at <span className='span'>{weatherData.UVI}</span>.
                </p>
              )
              :weatherData.UVI > 2 ? (
                <p>
                  You can safely enjoy the outside at UVI of <span className='span'>{weatherData.UVI}</span>, sunscreen application is still recommended as direct sunlight exposure over a long period of time can still cause serious damage to your skin.
                </p>
              )
              : weatherData.UVI <= 2 ? (
                <p>
                  Sunscreen applicatoin is not necessary as the UV index is low at <span className='span'>{weatherData.UVI}</span>, long exposure to sunlight is unlikely to cause harm sunglasses and hats are not recommended.
                </p>
              )
              : (
                <p>
                  Something went wrong.{<br/>} Check back another time!
                </p>
              )
            }
          </p>
          <Link to="/details" className="home__details-link">Details</Link>

          {!weatherData.isApplied 
          ?
          <button onClick={apply} className="home__apply-btn">APPPLIED</button> 
          : 
                  <div className="home__apply-btn-active">
                  <p className="home__apply-btn-active-p">UVI: {weatherData.UVI}</p>
                  <div className="home__apply-btn-cancel-wraper">
                    <div onClick={cancelApply} className="home__apply-btn-cancel-wrap">
                      <img src={cross} alt="Cancel Icon" className="home__apply-btn-cancel" />
                    </div>
                  </div>
                </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Home