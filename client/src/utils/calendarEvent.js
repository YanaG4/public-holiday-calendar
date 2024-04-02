import { holidays } from '../stores/Holidays';

export const getCalendarFormattedEvent = (chosenHolidays, countries) => {
    return chosenHolidays.map(event => {
        const country = countries.find(country => country.isoAlpha2Code === event.countryCode);
        event.color = country.color;
        event.id = event.holidayId;
        event.title = country.isoAlpha2Code + ": " + event.name;
        if (event.regional) {
            event.title = event.title + ": " + event.regions.toString().replace(/,/g, ", ");
        }
        event.allDay = true;
        event.start = new Date(event.date);
        event.end = new Date(event.date);
        return event;
    });
}

export const getCountryCodes = (countries) => {
    let countryCodes = "";
    countries.forEach(country => {
        countryCodes += country.isoAlpha2Code + ",";
    })
    return countryCodes.slice(0, -1); //remove the last coma
}

export const getHardcodedEvents = (countries) => {
    let filteredEvents = [];
        countries.forEach(country => {
            const event = holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code);
            if (event)
                filteredEvents = [...filteredEvents, holidays.find(holiday => holiday.countryCode === country.isoAlpha2Code)]
        });
        if (filteredEvents.length === 0) {
            return [];
        }
    return filteredEvents;
}
