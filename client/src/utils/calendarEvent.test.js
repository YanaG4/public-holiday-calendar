import { getCalendarFormattedEvent, getCountryCodes, getHardcodedEvents } from './calendarEvent';

describe('calendarEvent', () => {
    test.each([
        [[], ""],
        [[{isoAlpha2Code: "NZ"}], "NZ"],
        [[{isoAlpha2Code: "NZ"}, {isoAlpha2Code: "EE"}], "NZ,EE"]
    ])('getCountryCodes returns the correct string of country codes', (countries, codes) => {
        const countryCodes = getCountryCodes(countries);
        expect(countryCodes).toBe(codes);
    });

    test.each([
        [{chosenHolidays: [], countries: []}, []],
        [{chosenHolidays: [{countryCode: "NZ"}], countries: [{isoAlpha2Code: "EE"}]}, []],
        [{chosenHolidays: [{
            holidayId: 0,
            name: "New Year!!!",
            date: new Date("01-01-2024"),
            provider: {},
            countryCode: "NZ",
            regional: false,
            regions: "string",
        }], countries: [{
            isoAlpha2Code: "EE",
            color: '#338062',
        }, {isoAlpha2Code: "NZ",
            color: '#338060',
    }]}, 
    [{
        color: '#338060',
        id: 0,
        title: "NZ: New Year!!!",
        allDay: true,
        start: new Date("01-01-2024"),
        end: new Date("01-01-2024"),
    }]],
    ])('getCalendarFormattedEvent returns the correct event', ({chosenHolidays, countries}, formattedEvents) => {
        const events = getCalendarFormattedEvent(chosenHolidays, countries);
        expect(events).toEqual(formattedEvents);
    });

    test.each([
        [[], []],
        [[{isoAlpha2Code: "EENK"}], []],
    ])('getHardcodedEvents returns the empty array of events', (countries, events) => {
        const newEvents = getHardcodedEvents(countries);
        expect(newEvents).toEqual(events)
    });

    test.each([
        [[{isoAlpha2Code: "NZ"}], [{
            holidayId: 0,
            name: "New Year!!!",
            date: new Date("01-01-2024"),
            provider: {},
            countryCode: "NZ",
            regional: false,
            regions: "string",
        }]]
    ])('getHardcodedEvents returns the array of one event', (countries, events) => {
        const newEvents = getHardcodedEvents(countries);
        expect(newEvents).toHaveLength(1);
        expect(newEvents[0].name).toEqual(events[0].name)
    });

    test('getHardcodedEvents returns the correct array of multiple events', () => {
        const countries = [{isoAlpha2Code: "EE"}];
        const expectedEvents = [{
            holidayId: 0,
            name: "New Year!!!",
            countryCode: "EE",
            regional: false,
            regions: "string"
        },
        {
            holidayId: 0,
            name: "Another New Year!!!",
            countryCode: "EE",
            regional: false,
            regions: "string"
        }]
        const newEvents = getHardcodedEvents(countries);
        expect(newEvents).toHaveLength(3);
        expect(newEvents[0].countryCode).toBe(expectedEvents[0].countryCode);
        expect(newEvents[1].countryCode).toBe(expectedEvents[1].countryCode);
        expect(newEvents[0].name).toBe(expectedEvents[0].name);
        expect(newEvents[1].name).toBe(expectedEvents[1].name);
    });
})
