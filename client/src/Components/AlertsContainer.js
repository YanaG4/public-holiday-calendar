import React, { useRef, useState } from 'react'
import './AlertsContainer.css'
import isEmail from 'validator/lib/isEmail';

const BUTTON_CLASSNAME = {
    SUCCESS: "main-button-success",
    ERROR: "main-button-error",
    AWAIT: "main-button-await",
    NORMAL: "main-button"
}

export default function AlertsContainer({ countries }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const emailInput = useRef(null)

    function subscribeHandler(button) {
        const email = emailInput.current.value
        if (email === '') {
            setErrorMessage('Please enter an email')
            return
        }
        else if (isEmail(email)) {
            if (countries.length === 0) {
                setErrorMessage('Please select the countries')
                return
            }
            else {
                animateButtonAwaiting(button)
                try {
                    sendReminderSubscription(email)
                } catch (error) {
                    animateButtonResult(button, 'error')
                    return
                }
                animateButtonResult(button, 'success')
                emailInput.current.value = ''
                setErrorMessage(null)
            }
            return
        }
        else {
            setErrorMessage('Please enter a valid email')
        }
    }
    function sendReminderSubscription(email) {
        //send axios request
        //if success => animate button
        //else error-alert? +email != ''

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
