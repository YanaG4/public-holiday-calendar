import { screen, render } from '@testing-library/react';
import React from 'react';
import Office365 from './Office365';

describe('Office365', () => {
    test('renders component', () => {
        render(<Office365 />);
        const images = screen.getAllByAltText(/screenshot/i);
        expect(images).toHaveLength(4);
        expect(images[0]).toBeInTheDocument();
        expect(screen.getByText(/and click “Import”/i)).toBeInTheDocument();
    });
})
