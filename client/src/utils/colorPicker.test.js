import { getCountriesWithColors, countryNameToColour } from './colorPicker';

describe('colorPicker', () => {
    test.each([
        [[], []],
        [null, []]
    ])('getCountriesWithColors returns the epmty array', (countryList, result) => {
        const countriesWithcolors = getCountriesWithColors(countryList);
        expect(countriesWithcolors).toEqual(result);
    });

    test('getCountriesWithColors returns the array of countries with colors', () => {
        const countryList = [{commonName: "Estonia", isoAlpha2Code: "EE"}];
        const countriesWithcolors = getCountriesWithColors(countryList);
        expect(countriesWithcolors[0].commonName).toEqual("Estonia");
        expect(countriesWithcolors[0].isoAlpha2Code).toEqual("EE");
        expect(countriesWithcolors[0]).toHaveProperty("color");
    });

    it.each([
        ["Estonia", "#11b7d5"],
        ["", 0],
      ])('countryNameToColour returns the correct color', (countryName, expectedColor) => {
        const color = countryNameToColour(countryName);
        expect(color).toBe(expectedColor);
      });
})
