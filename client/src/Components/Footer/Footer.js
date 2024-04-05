import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-background'>
                <div>
                    <img src={require("../../img/logo.svg").default} alt="logo." />
                </div>
            </div>
        </div>
    )
}
