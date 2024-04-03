import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
    test('renders the page', () => {
        render (<App />);
        expect(screen.getByText(/Public Holiday Calendar/i)).toBeInTheDocument();
        expect(screen.getByText(/Choose your countries/i)).toBeInTheDocument();
        expect(screen.getByText(/sunday/i)).toBeInTheDocument();
        expect(screen.getByText(/Subscribe to Alerts/i)).toBeInTheDocument();
        expect(screen.getByText(/Subscribe with Outlook/i)).toBeInTheDocument();
        expect(screen.getByText(/Instruction/i)).toBeInTheDocument();
    })
})
