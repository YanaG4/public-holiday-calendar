import React from 'react'
import Office365 from './Office365'
import Outlook2013 from './Outlook2013'
import './Instruction.css'
import Outlook365Image from '../../img/outlook365.png'
import Outlook2013Image from '../../img/outlook2013.png'
import { useState } from 'react'

export default function Instruction() {
    const [outlookVesrion, setOutlookVersion] = useState('Office 365')

    function changeOutlookVersion() {
        if (outlookVesrion === "Office 365")
            setOutlookVersion("Outlook 2013")
        else
            setOutlookVersion("Office 365")
    }
    return (
        <section className='instruction-main-container'>
            <div className='button-container'>
                <button onClick={changeOutlookVersion}>
                    <img src={outlookVesrion === "Office 365" ? Outlook365Image : Outlook2013Image} />{outlookVesrion}</button>
                <button onClick={changeOutlookVersion}>{outlookVesrion === "Office 365" ? "Outlook 2013" : "Office 365"}</button>
            </div>
            <div className='instruction-container'>
                <div className='text-header'>
                    <h3>Instruction</h3>
                    <div className='underline'></div>
                </div>
                <div className='instruction-text'>
                    {outlookVesrion === "Office 365" ? <Office365 /> : <Outlook2013 />}
                </div>
            </div>
        </section>
    )
}
