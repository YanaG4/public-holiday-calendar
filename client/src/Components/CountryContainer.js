import React from 'react'
import './CountryContainer.css'
import CountryInput from './CountryInput';

export default function CountryContainer({ setCountries, chosenCountries }) {

    return (
        <div className='country-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-map-marker"></i>Choose your countries</h2>
            <CountryInput
                setCountries={setCountries}
                chosenCountries={chosenCountries} />
        </div>
    )
}
