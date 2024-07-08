import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './Header.scss';
import { Link } from 'react-router-dom';

import title from "../../assets/images/title.png"
import return_icon from "../../assets/icons/return.png"

import temp_regular from '../../assets/icons/guage_regular.png'
import temp_high from '../../assets/icons/guage_high.png'
import temp_low from '../../assets/icons/guage_low.png'

function Header() {

  const [weatherData, setWeatherData] =  useState([]);
  

  async function getWeatherData() {
    const response = await axios.get("http://localhost:8080/weather");
    setWeatherData(response.data[0])
  }


  useEffect(() => {
    getWeatherData();
  }, [])

  return (
    <div className='header'>
      <Link to="/" className="header__return-wrap">
        <img src={return_icon} alt="return img" className="header__return-img" />
      </Link>
      <div className="header__title-wrap">
        <img src={title} alt="title img" className="header__title-img" />
      </div>
      <div className="header__temp-wrap">
        <img src={
          weatherData.temperature > 25 
          ? temp_high 
          : weatherData.temperature > 15
          ? temp_regular 
          : weatherData.temperature <= 15 
          ? temp_low
          : temp_low
        } alt="temp img" className="header__temp-img" />
      </div>
    </div>
  )
}

export default Header 