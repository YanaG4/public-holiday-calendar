import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import './Calendar.scss'
import { holidays } from '../stores/Holidays'

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

        //need to add region support => change logic from find to filter for filteredEvents (not needed with fetched data)

        if (countries.length === 0) {
            setEvents([])
            return
        }

        //fetch events for countries

        let filteredEvents = []
        countries.forEach(country => {
            const event = holidays.find(holiday => holiday.country == country.isoAlpha2Code)
            if (event)
                filteredEvents = [...filteredEvents, holidays.find(holiday => holiday.country == country.isoAlpha2Code)]
        });

        if (filteredEvents.length === 0) {
            setEvents([])
            return
        }
        const eventDataSuitedForCalendar = filteredEvents.map(event => {
            const country = countries.find(country => country.isoAlpha2Code === event.country)
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
