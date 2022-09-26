import React, { useEffect, useState } from 'react'
import './Subscription.css'
import { SUBCRIPTION_ENDPOINT } from '../../constants/api'

export default function Subscription({ countries }) {
    const [link, setLink] = useState(null)
    const [separateLinks, setSeparateLinks] = useState([])

    useEffect(() => {
        if (countries.length !== 0) {
            getSubscriptionLink()
        }
        else {
            setLink('Choose countries to get the subscription link')
            setSeparateLinks(['Choose countries to get the subscription link'])
        }
    }, [countries])

    function getSubscriptionLink() {
        setLink(SUBCRIPTION_ENDPOINT + countries[0].code)
        if (countries.length === 1) {
            setSeparateLinks(['Choose more than one country to get separate links'])
            return
        }
        setSeparateLinks([SUBCRIPTION_ENDPOINT + countries[0].code])
        for (let i = 1; i < countries.length; i++) {
            setSeparateLinks(prevState => [...prevState, SUBCRIPTION_ENDPOINT + countries[i].code])
            setLink(prevState => prevState + ',' + countries[i].code)
        }
    }
    return (
        <div>
            <div className='text-header'>
                <i className="fa fa-envelope"></i>
                <h3>Subscribe with Outlook</h3>
                <div className='underline underline-white'></div>
            </div>
            <div className='links-container'>
                <p>Subscribe to the public holidays feed on your Outlook Calendar with this link:</p>
                <div className='link-container'>{link}</div>
                <p>Or you can add them separately*</p>
                <div className='link-container'>
                    {
                        separateLinks.map((link) => (
                            <li key={link}>{link}</li>
                        ))}
                </div>
                <p className='warning-text'>* Adding them separately means that you can toggle them on and off individually.</p>
            </div>
        </div>
    )
}
