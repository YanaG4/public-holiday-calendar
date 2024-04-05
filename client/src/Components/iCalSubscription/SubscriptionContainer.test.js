import { render, screen } from '@testing-library/react';
import React from 'react';
import SubscriptionContainer from './SubscriptionContainer';

describe('SubscriptionContainer', () => {
    test('renders the component', () => {
        render (<SubscriptionContainer />);
        expect(screen.getByText(/Subscribe with Outlook/i)).toBeInTheDocument();
        expect(screen.getByText(/Instruction/i)).toBeInTheDocument();
        expect(screen.getByTestId('wave svg')).toBeInTheDocument();
    });
})
