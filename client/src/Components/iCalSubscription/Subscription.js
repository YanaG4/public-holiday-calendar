import React from 'react'
import './Subscription.css'

export default function Subscription() {
    return (
        <div>
            <div className='text-header'>
                <i class="fa fa-envelope"></i>
                <h3>Subscribe with Outlook</h3>
                <div className='underline underline-white'></div>
            </div>
            <div className='links-container'>
                <p>Subscribe to the public holidays feed on your Outlook Calendar with this link:</p>
                <div></div>
                <p>Or you can add them separately*</p>
                <div></div>
                <p className='warning-text'>* Adding them separately means that you can toggle them on and off individually.</p>
            </div>
        </div>
    )
}
