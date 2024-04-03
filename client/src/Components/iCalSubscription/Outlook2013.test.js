import { screen, render } from '@testing-library/react';
import React from 'react';
import Outlook2013 from './Outlook2013';

describe('Outlook2013', () => {
    test('renders component', () => {
        render(<Outlook2013 />);
        const images = screen.getAllByAltText(/screenshot/i);
        expect(images).toHaveLength(5);
        expect(images[0]).toBeInTheDocument();
        expect(screen.getByText(/From Internet/i)).toBeInTheDocument();
    });
})
