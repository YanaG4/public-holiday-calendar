import React, { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import './Calendar.scss'

const now = new Date()
const events2 = [
    {
        id: 0,
        title: '9 12 All Day Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 10,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 11,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 12,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 13,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 14,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 15,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 16,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 17,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 18,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 19,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 20,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 21,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 22,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 23,
        title: 'Event very long title',
        allDay: true,
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },
    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2022, 8, 12),
        end: new Date(2022, 8, 13),
        color: 'pink'
    },

    {
        id: 3,
        title: 'Estonia: Good Friday; Estonia',
        start: new Date(2022, 3, 15),
        end: new Date(2022, 3, 16),
        color: 'pink',
        country: 'Estonia'
    },

    {
        id: 4,
        title: 'Germany: Good Friday; Germany',
        start: new Date(2022, 3, 15),
        end: new Date(2022, 3, 16),
        color: 'pink',
        country: 'Germany'
    },
    {
        id: 5,
        title: 'Germany: Easter Sunday (Regional Holiday); Germany',
        start: new Date(2022, 3, 17),
        end: new Date(2022, 3, 18),
        color: 'pink',
        country: 'Germany'
    },
    {
        id: 6,
        title: 'Estonia: Easter Sunday; Estonia',
        start: new Date(2022, 3, 17),
        end: new Date(2022, 3, 18),
        color: 'pink',
        country: 'Estonia'
    },
    {
        id: 7,
        title: 'Germany: Easter Monday; Germany',
        start: new Date(2022, 3, 18),
        end: new Date(2022, 3, 19),
        color: 'pink',
        country: 'Germany'
    },
    {
        id: 8,
        title: 'Germany: Easter Sunday (Regional Holiday); Germany: Brandenburg',
        start: new Date(2022, 8, 17),
        end: new Date(2022, 8, 18),
        color: 'pink'
    },
    {
        id: 9,
        title: 'Estonia: Easter Sunday; Estonia my text is here',
        start: new Date(2022, 8, 17),
        end: new Date(2022, 8, 18),
        color: 'pink',
        country: 'Estonia'
    }
]
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
    const [events, setEvents] = useState(events2)

    useEffect(() => {
        //fetch events for countries
        //setEvents
    }, [countries])

    return (
        <>
            <div className='calendar-container'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    eventPropGetter={(events) => {
                        const backgroundColor = events.country === 'Estonia' ? '#FF7F50' : '#8A2BE2';
                        return { style: { backgroundColor } }
                    }}
                />
            </div>
        </>
    );
}

export default MyCalendar;
