import React from 'react'
import successful from '../assets/images/successful.png'

import './Successful.scss'


const Successful = ({ isSubmitted }) => {
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className='successful-container'>
        <img src={successful} alt="" />
        <h1>Thank you!</h1>
        <p>We´ve added your card details</p>
        <button onClick={handleClick}>Continue</button>
    </div>
  )
}

export default Successful