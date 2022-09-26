import React, { useRef, useState } from 'react'
import './AlertsContainer.css'
import isEmail from 'validator/lib/isEmail';

export default function AlertsContainer({ countries }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const emailInput = useRef(null)
    function subscribeHandler() {
        const email = emailInput.current.value
        if (email == '') {
            setErrorMessage('Please enter an email')
            return
        }
        else if (isEmail(email)) {
            if (countries.length === 0) {
                setErrorMessage('Please select the countries')
                return
            }
            else {
                emailInput.current.value = ''
                setErrorMessage(null)
            }
            return
        }
        else {
            setErrorMessage('Please enter a valid email')
        }
    }

    return (
        <div className='alerts-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-bell"></i>Subscribe to Alerts</h2>
            <div className='small-container-input'>
                <input type="text" placeholder="Enter your E-mail" ref={emailInput} />
                <div className='warning-text error-text'>{errorMessage}</div>
            </div>
            <button className='main-button' onClick={subscribeHandler}>Subscribe</button>
        </div>
    )
}
