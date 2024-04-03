import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { useCountry } from '../../CountryContext';
import { GET_HOLIDAYS_ENDPOINT } from '../../constants/api';
import { getCalendarFormattedEvent, getCountryCodes, getHardcodedEvents } from '../../utils/calendarEvent';
/* date format */
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.scss';

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
    const [events, setEvents] = useState([]);
    const countries = useCountry();

    const saveEventsForCalendar = useCallback((chosenHolidays) => {
        setEvents(getCalendarFormattedEvent(chosenHolidays, countries));
    }, [countries])

    useEffect(() => {
        if (!countries.length) {
            setEvents([]);
            return;
        }

        let countryCodes = getCountryCodes(countries);

        axios.get(`${GET_HOLIDAYS_ENDPOINT}?countries=${countryCodes}`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    saveEventsForCalendar(response.data);
                } else {
                    saveEventsForCalendar(getHardcodedEvents(countries));
                }})
            .catch(error => {
                console.log(error.message);
                saveEventsForCalendar(getHardcodedEvents(countries)); //if real data isn't available - use hardcoded data
                return });
    }, [countries, saveEventsForCalendar])



    return (
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
    );
}

export default MyCalendar;
