import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import AlertsContainer from './AlertsContainer';
import { WARNING_MESSAGE } from '../../constants/values';
import { useCountry } from '../../CountryContext';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SEND_SUBSCRIPTION_ENDPOINT } from '../../constants/api';

jest.mock('../../CountryContext', () => ({
    __esModule: true,
    useCountry: jest.fn()
}))

const mock = new MockAdapter(axios);

describe('AlertsContainer', () => {
    beforeEach(() => {
        useCountry.mockReset();
        mock.reset();
    });

    test('renders component', () => {
        render(<AlertsContainer />);
        expect(screen.getByText(/alerts/i)).toBeInTheDocument();
        expect(screen.getByTestId('subscribeButton')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your E-mail')).toBeInTheDocument();
    });

    test('clicking Subscribe with empty email input returns correct warning', async () => {
        render(<AlertsContainer />);
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');
        expect(subscribeErrorLabel).toHaveTextContent('');
        userEvent.click(subscribe);
        await waitFor(() => { 
        expect(subscribeErrorLabel).toHaveTextContent(WARNING_MESSAGE.EMAIL_FIELD_IS_EMPTY);
        })
    });

    test('clicking Subscribe with incorrect email returns correct warning', async () => {
        render(<AlertsContainer />);
        const inputField = screen.getByPlaceholderText('Enter your E-mail');
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');

        expect(subscribeErrorLabel).toHaveTextContent('');

        await userEvent.type(inputField, 'notanemail');
        userEvent.click(subscribe);

        expect(inputField).toHaveValue('notanemail');
        await waitFor(() => { 
        expect(subscribeErrorLabel).toHaveTextContent(WARNING_MESSAGE.EMAIL_IS_INVALID);
        })
    });

    test('clicking Subscribe with correct email but no countries renders correct warning', async () => {
        useCountry.mockReturnValue([]);
        render(<AlertsContainer />);
        const inputField = screen.getByPlaceholderText('Enter your E-mail');
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');

        expect(subscribeErrorLabel).toHaveTextContent('');

        await userEvent.type(inputField, 'email@email.com');
        userEvent.click(subscribe);
        expect(inputField).toHaveValue('email@email.com');
        await waitFor(() => { 
        expect(subscribeErrorLabel).toHaveTextContent(WARNING_MESSAGE.NO_COUNTRY_SELECTED);
        })
    });

    test('everything is correctly filled in, and server responded the status is 200', async () => {
        useCountry.mockReturnValue([{ isoAlpha2Code: 'EE' }]);
        
        const response = { status: 200, data: [{}] };
        mock.onPost(SEND_SUBSCRIPTION_ENDPOINT).reply(200, response);
    
        render(<AlertsContainer />);
    
        const inputField = screen.getByPlaceholderText('Enter your E-mail');
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');
    
        await userEvent.type(inputField, 'email@email.com');
        await userEvent.click(subscribe);
        await waitFor(() => {
        expect(subscribeErrorLabel).toHaveTextContent('');
        });
    });

    test('everything is correctly filled in, but server responded with error', async () => {
        useCountry.mockReturnValue([{ isoAlpha2Code: 'EE' }]);
        
        const response = { status: 404, data: [{}] };
        mock.onPost(SEND_SUBSCRIPTION_ENDPOINT).reply(404, response);
    
        render(<AlertsContainer />);
    
        const inputField = screen.getByPlaceholderText('Enter your E-mail');
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');
    
        await userEvent.type(inputField, 'email@email.com');
        await userEvent.click(subscribe);
        await waitFor(() => {
        expect(subscribeErrorLabel).toHaveTextContent(WARNING_MESSAGE.SUBSCRIPTION_ERROR);
        });
    });

    test('everything is correctly filled in, but got a Network Error', async () => {
        useCountry.mockReturnValue([{ isoAlpha2Code: 'EE' }]);
        
        mock.onPost(SEND_SUBSCRIPTION_ENDPOINT).networkError();
    
        render(<AlertsContainer />);
    
        const inputField = screen.getByPlaceholderText('Enter your E-mail');
        const subscribe = screen.getByTestId('subscribeButton');
        const subscribeErrorLabel = screen.getByTestId('subscribeErrorLabel');
    
        await userEvent.type(inputField, 'email@email.com');
        await userEvent.click(subscribe);
        await waitFor(() => {
        expect(subscribeErrorLabel).toHaveTextContent(WARNING_MESSAGE.SERVER_ERROR);
        });
    });

})
