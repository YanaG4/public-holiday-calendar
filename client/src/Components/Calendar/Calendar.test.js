import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Calendar from './Calendar';
import { useCountry } from '../../CountryContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { GET_HOLIDAYS_ENDPOINT } from '../../constants/api';

jest.mock('../../CountryContext', () => ({
  __esModule: true,
  useCountry: jest.fn()
}))

const mock = new MockAdapter(axios);

describe('Calendar', () => {
  beforeEach(() => {
    useCountry.mockReset();
    mock.reset();
  });

  test('renders component without chosen countries', () => {
    useCountry.mockReturnValue([]);
    render(<Calendar />);
    expect(screen.queryByText(/new year/i)).not.toBeInTheDocument();
  });

  test('has chosen country with 404 status - expect to see hardcoded holidays', async () => {
    useCountry.mockReturnValue([{ isoAlpha2Code: 'EE', commonName: 'Estonia' }]);
    mock.onGet(`${GET_HOLIDAYS_ENDPOINT}?countries=EE`).reply(404, {
      message: 'not found',
      status: 404,
    });
    render(<Calendar />);
    await waitFor(() => {
      const holidays = screen.getAllByText(/new year/i)
      expect(holidays[0]).toBeInTheDocument();
    })
  });

  test('has chosen countries with network error - expect to see hardcoded holidays', async () => {
    useCountry.mockReturnValue([{ isoAlpha2Code: 'EE', commonName: 'Estonia' }, { isoAlpha2Code: 'FR', commonName: 'France' }]);
    mock.onGet(`${GET_HOLIDAYS_ENDPOINT}?countries=EE,FR`).networkError();
    render(<Calendar />);
    await waitFor(() => {
      const holidays = screen.getAllByText(/new year/i)
      expect(holidays[0]).toBeInTheDocument();
    })
  });

  test('has chosen country and renders real holidays from the server', async () => {
    useCountry.mockReturnValue([{ isoAlpha2Code: 'EE', commonName: 'Estonia' }, { isoAlpha2Code: 'FR', commonName: 'France' }]);
    mock.onGet(`${GET_HOLIDAYS_ENDPOINT}?countries=EE,FR`).reply(200, [{
        holidayId: 0,
        name: "Estonian holiday",
        date: new Date(Date.now()),
        countryCode: "EE",        
        provider: {},
        regional: false,
        regions: "string"
    },
    {
        holidayId: 0,
        name: "French holiday",
        date: new Date(Date.now()),
        countryCode: "FR",
        provider: {},
        regional: false,
        regions: "string"
    }]);
    render(<Calendar />);
    await waitFor(() => {
      expect(screen.getByText(/Estonian/i)).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText(/french/i)).toBeInTheDocument();
    })
  });

  test('back button switches calendar to the previous month', async () => {
    useCountry.mockReturnValue([]);
    render(<Calendar />);
    const backButton = screen.queryByText(/back/i);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const prevMonthName = currentDate.toLocaleString('default', { month: 'long' });
    userEvent.click(backButton);
    await waitFor(() => {
      expect(screen.getByText(new RegExp(prevMonthName, 'i'))).toBeInTheDocument();
    })
  });

  test('next button switches calendar to the next month', async () => {
    useCountry.mockReturnValue([]);
    render(<Calendar />);
    const nextButton = screen.queryByText(/next/i);
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);
    const nextMonthName = currentDate.toLocaleString('default', { month: 'long' });
    userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText(new RegExp(nextMonthName, 'i'))).toBeInTheDocument();
    })
  });

})