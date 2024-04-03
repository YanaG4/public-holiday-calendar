import React from 'react'

export default function Outlook2013() {
    return (
        <table data-testid='outlook2013'>
            <tbody>
                <tr>
                    <td><p>1</p></td>
                    <td>In the calendar view → Click on “My Calendars” with right mouse button → “Add calendar” → “From Internet”
                        <br />
                        <img src={require('../../img/outlook2013/1.png')} alt="Instruction first screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>2</p></td>
                    <td>Paste the link to the field
                        <br />
                        <img src={require('../../img/outlook2013/2.png')} alt="Instruction second screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>3</p></td>
                    <td>Click YES
                        <br />
                        <img src={require('../../img/outlook2013/3.png')} alt="Instruction third screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>4</p></td>
                    <td>You’ll get a new panel on the right with this new Calendar. You can combine it with your main calendar like this:
                        <br />
                        <img src={require('../../img/outlook2013/4.png')} alt="Instruction fouth screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>5</p></td>
                    <td>The result would look like this:
                        <br />
                        <img src={require('../../img/outlook2013/5.png')} alt="Instruction fifth screenshot." />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
