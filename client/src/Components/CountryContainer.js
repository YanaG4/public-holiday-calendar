import React from 'react'
import CountryInput from './CountryInput';

import './CountryContainer.css'

export default function CountryContainer({ setCountries }) {
    return (
        <div className='country-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-map-marker"></i>Choose your countries</h2>
            <CountryInput
                setCountries={setCountries} />
        </div>
    )
}
