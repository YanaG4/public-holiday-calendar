import { screen, render, waitFor } from '@testing-library/react';
import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import CountryInput from './CountryInput';
import { useCountry, useCountryUpdate } from '../../CountryContext';

let mockChosenCountries = [];

jest.mock('../../CountryContext', () => ({
    __esModule: true,
    useCountry: jest.fn(),
    useCountryUpdate: jest.fn()
}));

jest.mock('axios');

describe('CountryInput', () => {
    beforeEach(() => {
        useCountry.mockReset();
        axios.get.mockRejectedValue(new Error('Network Error'));
    });

    test('render component with no chosen countries', () => {
        useCountry.mockReturnValue([]);
        render(<CountryInput />);
        const autocomplete = screen.getByTestId('countryAutocomplete');
        const chousenCountries = screen.queryAllByTestId('chosenCountry');
        const countryOptions = screen.queryAllByTestId('coutryOption');
        const inputField = screen.getByPlaceholderText(/choose/i);
        expect(chousenCountries).toHaveLength(0);
        expect(autocomplete).toBeInTheDocument();
        expect(inputField).toBeInTheDocument();
        expect(countryOptions).toHaveLength(0);
        expect(inputField).toHaveFocus();
        expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument();
    });

    test('render component with 2+ chosen countries', () => {
        useCountry.mockReturnValue([{commonName: 'Estonia', isoAlpha2Code: 'EE'}, {commonName: "France", isoAlpha2Code: "FR"}]);
        render(<CountryInput />);
        const chousenCountries = screen.queryAllByTestId('chosenCountry');
        expect(chousenCountries).toHaveLength(2);
        expect(chousenCountries[0]).toHaveTextContent("Estonia");
        expect(chousenCountries[1]).toHaveTextContent("France");
        expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
        expect(screen.getByTitle('Clear')).toBeInTheDocument();
    });

    test('close button works correctly - removes all chosen countries', async () => {
        mockChosenCountries = [{commonName: 'Estonia', isoAlpha2Code: 'EE'}, {commonName: "France", isoAlpha2Code: "FR"}];
        useCountry.mockReturnValue(mockChosenCountries);
        const mockSetCountries = jest.fn((newCountries) => {
            mockChosenCountries = newCountries;
          });
        useCountryUpdate.mockImplementation(() => mockSetCountries);
        render(<CountryInput />);
        const closeIcon = screen.getByTitle('Clear');

        userEvent.click(closeIcon)
        await waitFor(() => {
            expect(mockSetCountries).toHaveBeenCalledWith([]);
        })
    });

    test('clicking on input opens country list', async () => {
        useCountry.mockReturnValue([]);
        render(<CountryInput />);
        const searchField = screen.getByPlaceholderText(/choose/i);

        userEvent.click(searchField);
        await waitFor(() => {
            expect(screen.getAllByTestId('coutryOption')[0]).toBeInTheDocument();
        })
    });

    test('chosen countries do not render in the country list', async () => {
        useCountry.mockReturnValue([{commonName: 'Estonia', isoAlpha2Code: 'EE'}, {commonName: "France", isoAlpha2Code: "FR"}]);
        render(<CountryInput />);
        const searchField = screen.getByPlaceholderText(/choose/i);

        userEvent.click(searchField);
        await waitFor(() => {
            expect(screen.getByRole('option', { name: /United Arab Emirates/i })).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.queryByRole('option', { name: /Estonia/i })).not.toBeInTheDocument();
        })
    });
})
