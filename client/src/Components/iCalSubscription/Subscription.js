import React, { useEffect, useState, useContext } from 'react'
import './Subscription.css'
import { SUBCRIPTION_ENDPOINT } from '../../constants/api'
import { useCountry } from '../../CountryContext'

const LINK_WARNINGS = {
    NO_COUNTRY_TEXT: "Choose countries to get the subscription link",
    NOT_ENOUGH_COUNTRIES_TEXT: "Choose more than one country to get separate links"
}

export default function Subscription() {
    const [singleLink, setSingleLink] = useState(null)
    const [separateLinks, setSeparateLinks] = useState([])
    const countries = useCountry()

    useEffect(() => {
        if (!countries.length) {
            setSingleLink(LINK_WARNINGS.NO_COUNTRY_TEXT)
            setSeparateLinks([LINK_WARNINGS.NO_COUNTRY_TEXT])
            return
        }
        setSubscriptionLinks()
    }, [countries.length])

    function setSubscriptionLinks() {
        setSingleLink(SUBCRIPTION_ENDPOINT + countries[0].isoAlpha2Code)
        if (countries.length === 1) {
            setSeparateLinks([LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT])
            return
        }
        setSeparateLinks([SUBCRIPTION_ENDPOINT + countries[0].isoAlpha2Code])
        for (let i = 1; i < countries.length; i++) {
            setSeparateLinks(prevState => [...prevState, SUBCRIPTION_ENDPOINT + countries[i].isoAlpha2Code])
            setSingleLink(prevState => prevState + ',' + countries[i].isoAlpha2Code)
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
