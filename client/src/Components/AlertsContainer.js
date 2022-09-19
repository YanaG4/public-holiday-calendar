import React from 'react'
import './AlertsContainer.css'

export default function AlertsContainer() {
    return (
        <div className='alerts-container small-container'>
            <h2 className='small-container-header'><i className="fa fa-bell"></i>Subscribe to Alerts</h2>
            <input type="text" />
            <button>Subscribe</button>
        </div>
    )
}
