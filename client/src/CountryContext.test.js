import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { CountryProvider, useCountry, useCountryUpdate } from './CountryContext';

function DummyChildComponent() {
    const countries = useCountry();
    const setCountries = useCountryUpdate();
  
  return (
    <>
        <div data-testid="countries">{countries.join(', ')}</div>
        <button onClick={() => setCountries(['USA', 'Canada'])}>Update Countries</button>
    </>
  );
}

describe('CountryProvider', () => {
    beforeAll(() => {
        global.localStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
            removeItem: jest.fn(),
            key: jest.fn(),
            length: 0
        };
    });

    beforeEach(() => {
        localStorage.clear();
    });

    test('initializes with localStorage data', () => {
        const savedCountries = ['Germany', 'France'];
        localStorage.setItem('chosenCountries', JSON.stringify(savedCountries));
    
        render(
        <CountryProvider>
            <DummyChildComponent />
        </CountryProvider>
        );

        expect(screen.getByTestId('countries').textContent).toBe(savedCountries.join(', '));
    });

    test('renders no country if local storage is empty', () => {

        render(
            <CountryProvider>
                <DummyChildComponent />
            </CountryProvider>
        );

        expect(screen.getByTestId('countries').textContent).toBe('');
    });

    test('updates countries correctly', async () => {
        render(
            <CountryProvider>
                <DummyChildComponent />
            </CountryProvider>
        );
        userEvent.click(screen.getByText('Update Countries'));
        await waitFor(() => {
            expect(screen.getByTestId('countries').textContent).toBe('USA, Canada');
        });
        
        expect(JSON.parse(localStorage.getItem('chosenCountries'))).toEqual(['USA', 'Canada']);
    });
});