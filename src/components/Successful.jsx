import React from 'react'
import successful from '../assets/images/successful.png'

import './Successful.scss'


const Successful = ({ isSubmitted }) => {
  return (
    <div className='successful-container'>
        <img src={successful} alt="" />
        <h1>Thank you!</h1>
        <p>We´ve added your card details</p>
        <button>Continue</button>
    </div>
  )
}

export default Successful