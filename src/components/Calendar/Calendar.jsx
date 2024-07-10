import {react, useState, useEffect} from 'react';
import './Calendar.scss';
import { Info, DateTime, Interval } from 'luxon';
import classNames from 'classnames';

export default function Calendar() {
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

  function getDate(day, month, year) {
    console.log(`year ${year}`);
    console.log(`month ${month}`);
    console.log(`day ${day}`);
  }
  console.log(daysOfMonth[0].c)
  const data = daysOfMonth[0].c.month;
  console.log(data);
  
  return (
    <div className="calendar__container">
      <div className="calendar">
        <div className="calendar__headline">
          <div className="calendar__headline-month">
            {firstDayOfActiveMonth.monthShort}, {firstDayOfActiveMonth.year}
          </div>
          <div className="calendar__headline-controls">
            <div className="calendar__headline-control" onClick={goToPreviousMonth} >{"<<"}</div>
            <div className="calendar__headline-control 
            calendar__headline-controls-today"
            onClick={goToToday}
            >{"Today"}</div>
            <div className="calendar__headline-control" onClick={goToNextMonth} >{">>"}</div>
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
          {daysOfMonth.map((dayOfMonth, dayOfMonthIndex) => (
            <div onClick={() => {
              getDate(
                dayOfMonth.day, dayOfMonth.month, dayOfMonth.year
              )
            }} key={dayOfMonthIndex} className={classNames({
              "calendar__grid-cell": true,
              "calendar__grid-cell-inactive": 
              dayOfMonth.month !== firstDayOfActiveMonth.month,
              })}>
              {dayOfMonth.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}