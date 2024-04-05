import { screen, render } from '@testing-library/react';
import React from 'react';
import SubscriptionFooter from './SubscriptionFooter';

describe('SubscriptionFooter', () => {
    test('renders component', () => {
        render(<SubscriptionFooter />)
        expect(screen.getByTestId('wave svg')).toBeInTheDocument();
    });
})
