import React, { memo, useState } from 'react';
import Office365 from './Office365';
import Outlook2013 from './Outlook2013';
import Outlook365Image from '../../img/outlook365.png';
import Outlook2013Image from '../../img/outlook2013.png';

import './Instruction.css';

const MAIL_CLIENTS = {
    OFFICE365: 'Office 365',
    OUTLOOK2013: 'Outlook 2013'
}

function Instruction() {
    const [outlookVesrion, setOutlookVersion] = useState(MAIL_CLIENTS.OFFICE365);

    function changeOutlookVersion() {
        if (outlookVesrion === MAIL_CLIENTS.OFFICE365)
            setOutlookVersion(MAIL_CLIENTS.OUTLOOK2013);
        else
            setOutlookVersion(MAIL_CLIENTS.OFFICE365);
    }
    
    return (
        <section className='instruction-main-container'>
            <div className='button-container'>
                <button data-testid='mainMailClientButton' onClick={changeOutlookVersion}>
                    <img src={outlookVesrion === MAIL_CLIENTS.OFFICE365 ? Outlook365Image : Outlook2013Image} alt="Mail icon." />{outlookVesrion}</button>
                <button data-testid='secondaryMailClientButton' onClick={changeOutlookVersion}>{outlookVesrion === MAIL_CLIENTS.OFFICE365 ? MAIL_CLIENTS.OUTLOOK2013 : MAIL_CLIENTS.OFFICE365}</button>
            </div>
            <div className='instruction-container'>
                <div className='text-header'>
                    <h3>Instruction</h3>
                    <div className='underline' />
                </div>
                <div className='instruction-text'>
                    {outlookVesrion === MAIL_CLIENTS.OFFICE365 ? <Office365 /> : <Outlook2013 />}
                </div>
            </div>
        </section>
    )
}

export default memo(Instruction)
