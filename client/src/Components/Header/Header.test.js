import { screen, render } from '@testing-library/react';
import React from 'react';
import Header from './Header';

describe('Header', () => {
    test('renders component', () => {
        render(<Header />)
        expect(screen.getByText(/Public Holiday Calendar/i)).toBeInTheDocument();
    })
})
