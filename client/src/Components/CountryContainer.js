import React from 'react'
import './CountryContainer.css'

export default function CountryContainer() {
    return (
        <div className='country-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-map-marker"></i>Choose your countries</h2>
            <input type="text" />
            <button>Choose</button>
        </div>
    )
}
