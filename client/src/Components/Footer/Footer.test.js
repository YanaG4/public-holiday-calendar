import { screen, render } from '@testing-library/react';
import React from 'react';
import Footer from './Footer';

describe('Footer', () => {
    test('renders component', () => {
        render(<Footer />)
        expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    })
})
