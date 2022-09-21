import React from 'react'
import Instruction from './Instruction'
import Subscription from './Subscription'
import './SubscriptionContainer.css'

export default function SubscriptionContainer() {
    return (

        <section className='subscription-section'>
            <div className='subscription-container'>
                <Subscription />
            </div>
            <Instruction />
            <div className='subscription-gradient'>
                <div className='subscription-decoration'></div>
            </div>
        </section>
    )
}
