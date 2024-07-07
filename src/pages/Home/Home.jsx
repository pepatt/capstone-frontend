import './Home.scss'
import { Link } from 'react-router-dom'
import tube from '../../assets/icons/tube.jpg'
import temp_regular from '../../assets/icons/temp_regular.jpg'
import illustration_applied from '../../assets/images/illustration_applied.jpg'
import illustration_not_applied from '../../assets/images/illustration_not_applied.jpg'
import calendar from '../../assets/icons/calendar.jpg'
import friends from '../../assets/icons/friends.jpg'
import cross from '../../assets/icons/cross.jpg'
import { React, useState } from 'react'

function Home() {
  const [isApplied, setIsApplied] = useState(false);

  function toggleApply() {
    setIsApplied(!isApplied);
  }


  return (
    <div className='home'>
      <div className="home__header">
        <Link to="/" className="home__header-logo-wrap">
          <img src={tube} alt="App Logo" className="home__header-logo" />
        </Link>
        <div className="home__header-title">SPF BUD</div>
        <div className="home__header-temp-wrapper">
          <img src={temp_regular} alt="Temp Icon" className="home__header-temp-icon" />
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
                <p className="home__apply-btn-active-p">UVI: 1</p>
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