import React, { useRef, useState, useContext } from 'react'
import axios from 'axios'
import './AlertsContainer.css'
import isEmail from 'validator/lib/isEmail';
import { SEND_SUBSCRIPTION_ENDPOINT } from '../constants/api'
import { CountryContext } from '../App'

const BUTTON_CLASSNAME = {
    SUCCESS: "main-button-success",
    ERROR: "main-button-error",
    AWAIT: "main-button-await",
    NORMAL: "main-button"
}

const WARNING_MESSAGE = {
    EMAIL_FIELD_IS_EMPTY: 'Please enter an email',
    EMAIL_IS_INVALID: 'Please enter a valid email',
    NO_COUNTRY_SELECTED: 'Please select the countries',
    SUBSCRIPTION_ERROR: "Can't create a subscription for this e-mail"
}

export default function AlertsContainer() {
    const countries = useContext(CountryContext)
    const [errorMessage, setErrorMessage] = useState(null);
    const emailInput = useRef(null)

    async function subscribeHandler(button) {
        const email = emailInput.current.value
        if (!checkForInputData(email))
            return
        animateButtonAwaiting(button)
        const status = await sendReminderSubscription(email)
        if (status >= 300 || status < 200) {
            animateButtonResult(button, 'error')
            setErrorMessage(WARNING_MESSAGE.SUBSCRIPTION_ERROR)
        }
        else {
            animateButtonResult(button, 'success')
            emailInput.current.value = ''
            setErrorMessage(null)
        }
    }

    function checkForInputData(email) {
        if (email === '') {
            setErrorMessage(WARNING_MESSAGE.EMAIL_FIELD_IS_EMPTY)
            return 0
        }
        if (!isEmail(email)) {
            setErrorMessage(WARNING_MESSAGE.EMAIL_IS_INVALID)
            return 0
        }
        if (countries.length === 0) {
            setErrorMessage(WARNING_MESSAGE.NO_COUNTRY_SELECTED)
            return 0
        }
        return 1
    }

    async function sendReminderSubscription(email) {
        const countriesCodes = []
        countries.forEach(country => {
            countriesCodes.push(country.isoAlpha2Code)
        })
        try {
            let response = await axios({
                method: 'post',
                url: SEND_SUBSCRIPTION_ENDPOINT,
                data: {
                    email: email,
                    countries: countriesCodes
                }
            })
            const status = response.status
            console.log(status)
            return status
        } catch (error) {
            console.log(error.response)
            console.log(error.response.status);
            return error.response.status
        }
    }
    function animateButtonAwaiting(button) {
        button.classList.replace(BUTTON_CLASSNAME.NORMAL, BUTTON_CLASSNAME.AWAIT)
    }
    function animateButtonResult(button, result) {
        const buttonClass = (result === 'success') ? BUTTON_CLASSNAME.SUCCESS : BUTTON_CLASSNAME.ERROR
        setTimeout(() => {
            button.classList.replace(BUTTON_CLASSNAME.AWAIT, buttonClass)
        }, 1500);
        setTimeout(() => {
            button.classList.replace(buttonClass, BUTTON_CLASSNAME.NORMAL)
        }, 6000);
    }

    return (
        <div className='alerts-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-bell"></i>Subscribe to Alerts</h2>
            <div className='small-container-input'>
                <input type="text" placeholder="Enter your E-mail" ref={emailInput} />
                <div className='warning-text error-text'>{errorMessage}</div>
            </div>
            <button className='main-button' onClick={(e) => subscribeHandler(e.target)}></button>
        </div>
    )
}
