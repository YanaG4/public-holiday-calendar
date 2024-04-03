import React from 'react'
import './Instruction.css'

export default function Office365() {
    return (
        <table data-testid='office365'>
            <tbody>
                <tr>
                    <td><p>1</p></td>
                    <td>In the calendar view → Click on “Add calendar” located above the “My Calendars”
                        <br />
                        <img src={require('../../img/outlook365/1.png')} alt="Instruction first screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>2</p></td>
                    <td>Click on “Subscribe from web”
                        <br />
                        <img src={require('../../img/outlook365/2.png')} alt="Instruction second screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>3</p></td>
                    <td>Paste the link and enter a name and click “Import”:
                        <br />
                        <img src={require('../../img/outlook365/3.png')} alt="Instruction third screenshot." />
                    </td>
                </tr>
                <tr>
                    <td><p>4</p></td>
                    <td>The result would look like this:
                        <br />
                        <img src={require('../../img/outlook365/4.png')} alt="Instruction fourth screenshot." />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
