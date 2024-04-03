import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Instruction from './Instruction';

describe('Instruction', () => {
    test('renders component with the default mail client', () => {
        render(<Instruction />);
        expect(screen.getByText(/Instruction/i)).toBeInTheDocument();
        expect(screen.getByAltText(/mail/i)).toBeInTheDocument();
        expect(screen.getByTestId('mainMailClientButton')).toHaveTextContent("Office 365");
        expect(screen.getByTestId('secondaryMailClientButton')).toHaveTextContent("Outlook 2013");
    });

    test('switch the instructions based on chosen mail client', async () => {
        render(<Instruction />);
        const mainButton = screen.getByTestId('mainMailClientButton');
        const secondaryButton = screen.getByTestId('secondaryMailClientButton');
        userEvent.click(mainButton)
        await waitFor(() => {
            expect(mainButton).toHaveTextContent("Outlook 2013");
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(secondaryButton).toHaveTextContent("Office 365");
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByTestId('outlook2013')).toBeInTheDocument();
        })
        userEvent.click(secondaryButton)
        await waitFor(() => {
            expect(secondaryButton).toHaveTextContent("Outlook 2013");
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(mainButton).toHaveTextContent("Office 365");
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByTestId('office365')).toBeInTheDocument();
        })
    });
})
