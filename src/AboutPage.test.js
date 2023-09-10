import { render } from '@testing-library/react';
import AboutPage from './AboutPage';

it('renders', () => {
	render(<AboutPage />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<AboutPage />);
	expect(asFragment()).toMatchSnapshot();
});

it('renders expected text', () => {
	const { getByText } = render(<AboutPage />);
	expect(getByText('Special Thanks')).toBeTruthy();
});
