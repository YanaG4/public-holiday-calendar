import { render, screen } from '@testing-library/react';
import React from 'react';
import Subscription from './Subscription';
import { LINK_WARNINGS } from '../../constants/values';
import { useCountry } from '../../CountryContext';
import { SUBCRIPTION_ENDPOINT } from '../../constants/api';

jest.mock('../../CountryContext', () => ({
    __esModule: true,
    useCountry: jest.fn()
}))

describe('Subscription', () => {
    beforeEach(() => {
        useCountry.mockReset();
    });

    test('renders the component', () => {
        useCountry.mockReturnValue([]);
        render (<Subscription />);
        expect(screen.getByText(/Subscribe with Outlook/i)).toBeInTheDocument();
    });

    test('no countries provided', () => {
        useCountry.mockReturnValue([]);
        render (<Subscription />);
        const subsLinks = screen.getAllByText(LINK_WARNINGS.NO_COUNTRY_TEXT);
        expect(subsLinks[0]).toBeInTheDocument();
        expect(subsLinks[0]).toHaveClass('link-container-inactive')
        expect(subsLinks).toHaveLength(2);
    });

    test('one country provided', () => {
        useCountry.mockReturnValue([{isoAlpha2Code: 'EE', commonName: 'Estonia', phone: '372', color: '#11b7d5'}]);
        render (<Subscription />);

        const subsLinks = screen.queryAllByText(LINK_WARNINGS.NO_COUNTRY_TEXT);
        const multipleLinkText = screen.getByText(LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT);
        const multipleLinks = screen.getByTestId('multipleLinks');
        const singleLink = screen.getByText(SUBCRIPTION_ENDPOINT + 'EE');

        expect(subsLinks).toHaveLength(0);
        expect(multipleLinkText).toBeInTheDocument();
        expect(multipleLinks).toHaveClass('link-container-inactive');
        expect(singleLink).toBeInTheDocument();
        expect(singleLink).not.toHaveClass('link-container-inactive');
    });

    test('two+ countries provided', () => {
        useCountry.mockReturnValue([{isoAlpha2Code: 'EE', commonName: 'Estonia'}, {isoAlpha2Code: 'FR', commonName: 'France'}]);
        render (<Subscription />);

        const subsLinks = screen.queryAllByText(LINK_WARNINGS.NO_COUNTRY_TEXT);
        const multipleLinkText = screen.queryByText(LINK_WARNINGS.NOT_ENOUGH_COUNTRIES_TEXT);
        const multipleLinks = screen.getByTestId('multipleLinks');
        const links = screen.getAllByTestId('links');
        const singleLink = screen.getByText(SUBCRIPTION_ENDPOINT + 'EE,FR');

        expect(subsLinks).toHaveLength(0);
        expect(multipleLinkText).not.toBeInTheDocument();
        expect(multipleLinks).not.toHaveClass('link-container-inactive');
        expect(singleLink).toBeInTheDocument();
        expect(singleLink).not.toHaveClass('link-container-inactive');
        expect(links).toHaveLength(2);
        expect(links[0]).toBeInTheDocument();
        expect(links[0]).toHaveTextContent(SUBCRIPTION_ENDPOINT + 'EE');
        expect(links[1]).toHaveTextContent(SUBCRIPTION_ENDPOINT + 'FR');
    });
})
