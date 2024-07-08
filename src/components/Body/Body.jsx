import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../../modals/Calendar';

function Body() {
    const [isApplied, setIsApplied] = useState(false);
    const [isCalendar, setIsCalendar] = useState(false);

    //put isApplied into database
    function applyHandler() {
        setIsApplied(!isApplied);
        console.log(isApplied);
    }

    function calendarToggle() {
        setIsCalendar(!isCalendar);
    }

  return (
    <div className='body'>
        <button className="body__apply" onClick={applyHandler}>APPLY</button>
        <Link to="/calendar">LOG</Link>
        <button onClick={calendarToggle}>MODAL LOG</button>
        {isCalendar && (<Calendar/>)}
        <Link to="/details">Details</Link>

    </div>
  )
}

export default Body