import { holidays } from '../stores/Holidays';

export const getCalendarFormattedEvent = (chosenHolidays, countries) => {
    const formattedEvents = new Set(chosenHolidays.map(event => {
        const country = countries.find(country => country?.isoAlpha2Code === event?.countryCode);
        if (!country) return null;
        const newEvent = {};
        newEvent.color = country.color;
        newEvent.id = event.holidayId;
        newEvent.title = country.isoAlpha2Code + ": " + event.name;
        if (event.regional) {
            newEvent.title = event.title + ": " + event.regions.toString().replace(/,/g, ", ");
        }
        newEvent.allDay = true;
        newEvent.start = new Date(event.date);
        newEvent.end = new Date(event.date);
        return newEvent;
    }));
    if (formattedEvents.has(null))
        formattedEvents.delete(null);
    return Array.from(formattedEvents);
}

export const getCountryCodes = (countries) => {
    let countryCodes = "";
    countries.forEach(country => {
        countryCodes += country?.isoAlpha2Code + ",";
    })
    return countryCodes.slice(0, -1); //remove the last coma
}

export const getHardcodedEvents = (countries) => {
    let filteredEvents = [];
        countries.forEach(country => {
            const events = holidays.filter(holiday => holiday?.countryCode === country?.isoAlpha2Code);
            if (events.length)
                filteredEvents = [...filteredEvents, ...events]
        });
        if (filteredEvents.length === 0) {
            return [];
        }
    return filteredEvents;
}
