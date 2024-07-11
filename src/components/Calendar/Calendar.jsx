import {react, useState, useEffect} from 'react';
import './Calendar.scss';
import { Info, DateTime, Interval } from 'luxon';
import classNames from 'classnames';
import check from '../../assets/icons/check.png'
import Header from '../Header/Header';
import axios from 'axios';

import clouds from '../../assets/images/clouds.png'
import sun from '../../assets/images/sun.png'
import rain from '../../assets/images/rain.png'
import sun_clouds from '../../assets/images/sun_clouds.png'

import back from '../../assets/icons/back.png'
import forward from '../../assets/icons/forward.png'


export default function Calendar({refresh}) {

  const [isAppliedDays, setIsAppliedDays] = useState([]);
  const [allDaysData, setAllDaysData] = useState([]);

  const today = DateTime.local();
  const [firstDayOfActiveMonth, setFirstDayOfActiveMonth] = useState(
    today.startOf('month')
  );
  const weekDays = Info.weekdays('short');
  const daysOfMonth = Interval.fromDateTimes(
    firstDayOfActiveMonth.startOf('week'),
    firstDayOfActiveMonth.endOf('month').endOf('week')
  ).splitBy({day: 1}).map(day => day.start);


  const goToPreviousMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.minus({month: 1}))
  }

  const goToNextMonth = () => {
    setFirstDayOfActiveMonth(firstDayOfActiveMonth.plus({month: 1}))
  }

  const goToToday = () => {
    setFirstDayOfActiveMonth(today.startOf('month'));
  }

  async function conditionalRenderData() {
    try{
    const dateData = {
        month: firstDayOfActiveMonth.c.month,
        year: firstDayOfActiveMonth.c.year
    }

    const response = await axios.post("http://localhost:8080/weather/dataDependant", dateData);
    setIsAppliedDays(response.data)

    } catch (err) {
      console.log(err);
    }
  }
  
  async function allRenderData() {
    try {
      const dateData = {
        month: firstDayOfActiveMonth.c.month,
        year: firstDayOfActiveMonth.c.year
    }
      const response = await axios.post("http://localhost:8080/weather/dateDependantWeather", dateData);
      setAllDaysData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    conditionalRenderData();
    allRenderData();
  }, []);

  useEffect(() => {
    conditionalRenderData();
    allRenderData();
  }, [firstDayOfActiveMonth, refresh]);


  return (
    <div className="calendar__container">
      <Header />
      <div className="calendar">
        <div className="calendar__headline">
          <div className="calendar__headline-month">
            {firstDayOfActiveMonth.monthShort}, {firstDayOfActiveMonth.year}
          </div>
          <div className="calendar__headline-controls">
            <div className="calendar__headline-control" onClick={goToPreviousMonth} >
              <img src={back} alt="Forward Icon" className="calendar__headline-control-arrow" />
            </div>
            <div className="calendar__headline-control 
            calendar__headline-controls-today"
            onClick={goToToday}
            >{"Today"}</div>
            <div className="calendar__headline-control" onClick={goToNextMonth} >
              <img src={forward} alt="Forward Icon" className="calendar__headline-control-arrow" />
            </div>
          </div>
        </div>
        <div className="calendar__weeks-grid">
          {weekDays.map((weekDay, weekDayIndex) => (
            <div key={weekDayIndex} className='calendar__weeks-grid-cell'>
              {weekDay}
            </div>
          ))}
        </div>
        <div className="calendar__grid">
          {daysOfMonth.map((dayOfMonth, dayOfMonthIndex) => {
            const isApplied = isAppliedDays.some((data) => data.created_at_day === dayOfMonth.day);
            const weatherObjFound = allDaysData.find((data) => data.created_at_day === dayOfMonth.day);

            return (
              <div key={dayOfMonthIndex} className="calendar__grid-wrap">
              <div className={classNames({
                "calendar__grid-wrapper": true, 
                "calendar__grid-cell-inactive": 
                  dayOfMonth.month !== firstDayOfActiveMonth.month,
              })}>
                <div className={"calendar__grid-cell"}>
                  {dayOfMonth.day}
                  {dayOfMonth.month === firstDayOfActiveMonth.month && (
                    <img src={check} alt="check img" className={classNames({
                      "calendar__grid-cell-img": true,
                      "display__no": !isApplied,
                      })}/>
                  )}
                </div>
                <img src={
                  dayOfMonth.month !== firstDayOfActiveMonth.month
                  ? ""
                  : typeof weatherObjFound === 'undefined'
                  ? ""
                  : weatherObjFound.description === "cloudy" 
                  ? clouds 
                  : weatherObjFound.description === "clear sky"
                  ? sun 
                  : weatherObjFound.description === "few clouds" 
                  ? sun_clouds
                  : weatherObjFound.description === "raining"
                  ? rain
                  : clouds
                  } className={`calendar__grid-weather-icon`} />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}