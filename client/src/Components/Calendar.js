import React, { useState, useEffect, useCallback, useContext } from 'react'
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
import { CountryContext } from '../App'

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


function MyCalendar() {
    const [events, setEvents] = useState([])
    const countries = useContext(CountryContext)

    const saveEventsForCalendar = useCallback((chosenHolidays) => {
        const eventDataSuitedForCalendar = chosenHolidays.map(event => {
            const country = countries.find(country => country.isoAlpha2Code === event.countryCode)
            event.color = country.color
            event.id = event.holidayId
            event.title = country.isoAlpha2Code + ": " + event.name
            if (event.regional) {
                event.title = event.title + ": " + event.regions.toString().replace(/,/g, ", ")
            }
            event.allDay = true
            event.start = new Date(event.date)
            event.end = new Date(event.date)
            return event
        })
        setEvents(eventDataSuitedForCalendar)
    }, [countries])

    useEffect(() => {
        if (countries.length === 0) {
            setEvents([])
            return
        }

        let chosenHolidays
        let reqStatus = null
        let countriesCodes = ""
        countries.forEach(country => {
            countriesCodes += country.isoAlpha2Code + " "
        })
        countriesCodes = countriesCodes.trim().replace(/ /g, ',')

        axios.get(GET_HOLIDAYS_ENDPOINT + "?" + countriesCodes).then((response) => {
            const holidayList = response.data;
            reqStatus = response.status
            chosenHolidays = holidayList
            saveEventsForCalendar(chosenHolidays)
        }).catch(error => {
            console.log(error.message)
            return
        });

        if (reqStatus < 200 || reqStatus >= 300) {
            /* This code is needed for filtering hardcoded holiday data */
            let filteredEvents = []
            countries.forEach(country => {
                const event = holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code)
                if (event)
                    filteredEvents = [...filteredEvents, holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code)]
            });
            if (filteredEvents.length === 0) {
                setEvents([])
                return
            }
            chosenHolidays = filteredEvents
            saveEventsForCalendar(chosenHolidays)
            /* END OF THE CODE which is needed for filtering hardcoded holiday data */
        }
    }, [countries.length, saveEventsForCalendar])



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
