import React from 'react'
import Instruction from './Instruction'
import Subscription from './Subscription'
import './SubscriptionContainer.css'

export default function SubscriptionContainer({ countries }) {
    return (

        <section className='subscription-section'>
            <div className='subscription-container'>
                <Subscription countries={countries} />
            </div>
            <Instruction />
            <div className='subscription-gradient'>
                <div className='subscription-decoration'></div>
            </div>
        </section>
    )
}
