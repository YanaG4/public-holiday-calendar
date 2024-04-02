import React, { useEffect, useState, useCallback } from 'react'
import { useCountry } from '../../CountryContext'
import { SUBCRIPTION_ENDPOINT } from '../../constants/api'

import './Subscription.css'


const LINK_WARNINGS = {
    NO_COUNTRY_TEXT: "Choose countries to get the subscription link",
    NOT_ENOUGH_COUNTRIES_TEXT: "Choose more than one country to get separate links"
}

export default function Subscription() {
    const [singleLink, setSingleLink] = useState(null)
    const [separateLinks, setSeparateLinks] = useState([])
    const countries = useCountry()

    const setSubscriptionLinks = useCallback(() => { 
        if (!countries.length) {
            setSingleLink(LINK_WARNINGS.NO_COUNTRY_TEXT);
            setSeparateLinks([LINK_WARNINGS.NO_COUNTRY_TEXT]);
            return;
        }
        const newSingleLinks = [];
        const newSeparateLinks = [];
        for (let i = 0; i < countries.length; i++) {
            newSeparateLinks.push(SUBCRIPTION_ENDPOINT + countries[i].isoAlpha2Code);
            newSingleLinks.push(countries[i].isoAlpha2Code);
        }
        setSingleLink(SUBCRIPTION_ENDPOINT + newSingleLinks.join());
        setSeparateLinks(newSeparateLinks.length === 1 
            ? [LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT] 
            : newSeparateLinks);
    }, [countries])
    useEffect(() => {
        setSubscriptionLinks()
    }, [setSubscriptionLinks])

    
    return (
        <div>
            <div className='text-header'>
                <i className="fa fa-envelope"></i>
                <h3>Subscribe with Outlook</h3>
                <div className='underline underline-white'></div>
            </div>
            <div className='links-container'>
                <p>Subscribe to the public holidays feed on your Outlook Calendar with this link:</p>
                <div className={(countries.length < 1) ? 'link-container link-container-inactive' : 'link-container'}>{singleLink}</div>
                <p>Or you can add them separately*</p>
                <div className={(countries.length <= 1) ? 'link-container link-container-inactive' : 'link-container'}>
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
