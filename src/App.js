import React, { useState, useEffect } from 'react'
import bg_desktop from './assets/images/bg-main-desktop.png';
import bg_card_front from './assets/images/bg-card-front.png';
import bg_card_back from './assets/images/bg-card-back.png';
import './App.scss'
import { validation } from './validations/validations';
import Successful from './components/Successful';

const App = () => { 
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    exp_date_mm: '',
    exp_date_yy: '',
    cvc: ''
  })
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    // Validations
    const validations = () => {
        if (!formData.name) {
            errors.name = 'Name is required';
        } else if (formData.name.length < 5) {
            errors.name = 'Name must be 5 characters or more';
        } else if(formData.name.length > 15) {
            errors.name = 'Name must be 15 characters or less';
        }

        // CARD NUMBER ERRORS
        if (!formData.number) {
            errors.number = 'Card number is required';
        } else if (formData.number.length < 16 || formData.number.length > 16) {
            errors.number = 'The card number must be 16 digits';
        }

        // EXPIRATION DATE ERRORS
        const date = formData.exp_date_mm + '/' + formData.exp_date_yy;
        if (!formData.exp_date_mm || !formData.exp_date_yy) {
            errors.exp_date = 'Expiration date is required';
        } else if (/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) {
            errors.exp_date = 'Expiration date is not valid';
        } else if (formData.exp_date_mm < 2 && formData.exp_date_yy < 2) {
            errors.exp_date = 'Expiration date must have two digits, ex: 01/22';
        }

        if (!formData.cvc) {
            errors.cvc = 'CVC is required';
        } else if (formData.cvc < 3) {
            errors.cvc = 'CVC must be 3 digits long';        
        }

    }
    validations();
    if (Object.keys(errors).length === 0) {
        setIsSubmitted(true)
    }
  }


  // NUMBER DIVIDED WITH 3 SPACES
  const cardNumber = formData.number !== '' ? formData.number.substring(0, 4)
   + " " + formData.number.substring(4, 8)
   + " " + formData.number.substring(8, 12)
   + " " + formData.number.substring(12, 16) : '0000 0000 0000 0000';

   const cardHolder = formData.name !== '' ? formData.name : 'Felipe verger';

   const cvc = formData.cvc !== '' ? formData.cvc : 124;

   const exp_date_mm = formData.exp_date_mm !== '' ? formData.exp_date_mm : '09';
   const exp_date_yy = formData.exp_date_yy !== '' ? formData.exp_date_yy : '22';

  return (
    <div className='app__container'>
        <div className="app__cards-container">
            <img src={bg_desktop} alt="background" />
            <div className='front-card-block'>
                <img src={bg_card_front} className="front-card" alt="front-card" />
                <p>{cardNumber}</p>
                <span className='name'>{cardHolder}</span>
                <span className='expire-date'>{exp_date_mm + "/" + exp_date_yy}</span>
            </div>
            <div className='back-card-block'>
                <img src={bg_card_back} className="back-card" alt="back-card" />
                <span>{cvc}</span>
            </div>
        </div>
        <div className='app__form-container'>
            {isSubmitted ? (
                <Successful isSubmitted={isSubmitted}/>
            ) : (
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                Cardholder name
                <input
                    className={errors.name ? "active-error" : ''} 
                    type="text" 
                    placeholder='e.g Felipe Verger'
                    id='name'
                    name='name'
                    onChange={handleChange}
                />
                <small className="error">{errors.name}</small>
                </label>
                <label htmlFor="number">
                Cardholder number
                <input 
                    type="number" 
                    className={errors.number ? "active-error" : ''} 
                    placeholder='e.g 123456789'
                    id='number'
                    name='number'
                    onChange={handleChange}
                />
                <small className="error">{errors.number}</small>
                </label>
                <div className="security-block">
                    <label htmlFor="exp-date" className='exp-date-label'>
                        Exp date (MM/YY)
                        <div className='exp-date-inputs'>
                            <input 
                                type="number"
                                className={errors.exp_date ? "active-error" : ''} 
                                placeholder="MM"
                                id="exp-date"
                                name="exp_date_mm"
                                onChange={handleChange}
                            />
                            <input 
                                type="number" 
                                className={errors.exp_date ? "active-error" : ''} 
                                placeholder="YY"
                                id="exp-date"
                                name="exp_date_yy"
                                onChange={handleChange}
                            />
                        </div>
                        <small className="error">{errors.exp_date}</small>
                    </label>
                    <label htmlFor="cvc">
                        CVC
                        <input 
                            type="number"
                            className={errors.cvc ? "active-error" : ''}
                            placeholder='e.g 123'
                            id="cvc"
                            name="cvc"
                            onChange={handleChange}
                        />
                        <small className="error">{errors.cvc}</small>
                    </label>
                </div>

                <button type='submit'>Confirm</button>        
            </form>)}
        </div>

    </div>
  )
}

export default App