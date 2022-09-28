import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import './Calendar.scss'
import { holidays } from '../stores/Holidays'
import { GET_HOLIDAYS_ENDPOINT } from '../constants/api'

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

function MyCalendar({ countries }) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (countries.length === 0) {
            setEvents([])
            return
        }

        /* This code is needed for filtering hardcoded holiday data */
        let filteredEvents = []
        countries.forEach(country => {
            const event = holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code)
            if (event)
                filteredEvents = [...filteredEvents, holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code)]
        });
        console.log(filteredEvents);
        if (filteredEvents.length === 0) {
            setEvents([])
            return
        }
        let chosenHolidays = filteredEvents
        /* END OF THE CODE which is needed for filtering hardcoded holiday data */

        let countriesCodes = ""
        countries.forEach(country => {
            countriesCodes += country.isoAlpha2Code + " "
        })
        countriesCodes = countriesCodes.trim().replace(/ /g, ',')

        try {
            axios.get(GET_HOLIDAYS_ENDPOINT + "?" + countriesCodes).then((response) => {
                const holidayList = response.data;
                chosenHolidays = holidayList
            }).catch(error => {
                console.log(error.message)
                return
            });
        } catch (error) {
            console.log("Server does not respond: " + error.message);
        }

        const eventDataSuitedForCalendar = chosenHolidays.map(event => {
            const country = countries.find(country => country.isoAlpha2Code === event.countryCode)
            event.color = country.color
            event.id = event.holidayId
            event.title = country.commonName + ": " + event.name
            event.allDay = true
            event.start = new Date(event.date)
            // let endDate = new Date(event.date)
            // endDate.setDate(endDate.getDate() + 1)
            event.end = new Date(event.date)
            return event
        })
        setEvents(eventDataSuitedForCalendar)
        console.log(eventDataSuitedForCalendar);
    }, [countries])

    return (
        <>
            <div className='calendar-container'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    eventPropGetter={(events) => {
                        const backgroundColor = events.color ? events.color : '#8A2BE2';
                        return { style: { backgroundColor } }
                    }}
                />
            </div>
        </>
    );
}

export default MyCalendar;
