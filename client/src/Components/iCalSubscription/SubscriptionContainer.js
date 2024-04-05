import React from 'react'
import Instruction from './Instruction';
import Subscription from './Subscription';
import SubscriptionFooter from './SubscriptionFooter';

import './SubscriptionContainer.css';

export default function SubscriptionContainer() {
    return (
        <section className='subscription-section'>
            <Subscription />
            <Instruction />
            <SubscriptionFooter />
        </section>
    )
}
