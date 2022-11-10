import React, { memo, useState } from 'react'
import './Instruction.css'
import Office365 from './Office365'
import Outlook2013 from './Outlook2013'
import Outlook365Image from '../../img/outlook365.png'
import Outlook2013Image from '../../img/outlook2013.png'

const MAIL_CLIENTS = {
    OFFICE365: 'Office 365',
    OUTLOOK2013: 'Outlook 2013'
}

function Instruction() {
    const [outlookVesrion, setOutlookVersion] = useState(MAIL_CLIENTS.OFFICE365)

    function changeOutlookVersion() {
        if (outlookVesrion === MAIL_CLIENTS.OFFICE365)
            setOutlookVersion(MAIL_CLIENTS.OUTLOOK2013)
        else
            setOutlookVersion(MAIL_CLIENTS.OFFICE365)
    }
    return (
        <section className='instruction-main-container'>
            <div className='button-container'>
                <button onClick={changeOutlookVersion}>
                    <img src={outlookVesrion === MAIL_CLIENTS.OFFICE365 ? Outlook365Image : Outlook2013Image} alt="" />{outlookVesrion}</button>
                <button onClick={changeOutlookVersion}>{outlookVesrion === MAIL_CLIENTS.OFFICE365 ? MAIL_CLIENTS.OUTLOOK2013 : MAIL_CLIENTS.OFFICE365}</button>
            </div>
            <div className='instruction-container'>
                <div className='text-header'>
                    <h3>Instruction</h3>
                    <div className='underline'></div>
                </div>
                <div className='instruction-text'>
                    {outlookVesrion === MAIL_CLIENTS.OFFICE365 ? <Office365 /> : <Outlook2013 />}
                </div>
            </div>
        </section>
    )
}

export default memo(Instruction)