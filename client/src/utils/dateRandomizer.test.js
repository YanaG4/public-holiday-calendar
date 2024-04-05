import { generatePlusMinusNumber, getFormatedDate, randomHoliday, getRandomDate } from './dateRandomizer';

describe('dateRandomizer Functions', () => {
    test.each([
        [new Date('October 13, 2014 11:13:00'), '2014-10-13'],
        [new Date(2020, 0, 1), '2020-01-01']
    ])('getFormatedDate returns a date string in yyyy-mm-dd format', (date, expected) => {
        const unformattedDate = date;
        const formattedDate = getFormatedDate(unformattedDate);
        expect(formattedDate).toBe(expected);
    });

    test('generatePlusMinusNumber returns + - 10 if no argument was provided', () => {
        const plusMinusTen = generatePlusMinusNumber();
        expect(plusMinusTen).toBeGreaterThanOrEqual(-10);
        expect(plusMinusTen).toBeLessThanOrEqual(10)
    });

    test('generatePlusMinusNumber returns + - 5', () => {
        const plusMinusTen = generatePlusMinusNumber(5);
        expect(plusMinusTen).toBeGreaterThanOrEqual(-5);
        expect(plusMinusTen).toBeLessThanOrEqual(5)
    });

    test('randomHoliday returns a valid date format: yyyy-mm-dd', () => {
        const result = randomHoliday();
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        expect(result).toMatch(regex);
    });

    test('getRandomDate returns a Date instance', () => {
        const date = getRandomDate();
        expect(date instanceof Date).toBeTruthy();
    });
});
