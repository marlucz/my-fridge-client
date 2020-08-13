import React from 'react';
import { render } from '@testing-library/react';
import Spinner from 'components/Spinner/Spinner';

describe('<Spinner />', () => {
    it('renders correctly', () => {
        const { asFragment } = render(<Spinner />);
        expect(asFragment()).toMatchSnapshot();
    });

    it(`contains 'loading' text on the screen`, () => {
        const { getByText } = render(<Spinner />);
        expect(getByText('Loading')).toBeInTheDocument();
    });
});
