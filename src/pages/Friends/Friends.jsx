import { React, useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header'
import friends from '../../assets/icons/friends.png'
import './Friends.scss'

import cross from '../../assets/icons/cross.png'
import check from '../../assets/icons/check.png'


function Friends() {

  const [usersData, setusersData] =  useState([]);

  async function getusersData() {
    const response = await axios.get("http://localhost:8080/users");
    setusersData(response.data)
  }

  useEffect(() => {
    getusersData();
  }, [])

  return (
    <div className='friends'>
      <Header />
      <div className="friends__wrap">

      {usersData.map((data, index) => {
        return (
          <div key={index} className="friends__wrapper">
          <div className="friends__user-icon-wrap">
            <img src={friends} alt="user icon" className="friends__user-icon" />
          </div>
          <div className="friends__name-wrap">
            <p className="friends__name">{data.name}</p>
          </div>
          <div className="friends__applied-wrap">
            <p className="friends__applied">Applied?</p>
            <img src={
              data.isApplied === 0
              ? cross
              : data.isApplied === 1
              ? check
              : cross
            } alt="applied img" className="friends__applied-img" />
          </div>
        </div>
        );
      })}

      </div>
    </div>
  )
}

export default Friends