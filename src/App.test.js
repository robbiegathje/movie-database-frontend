import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

it('renders', () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('renders the LandingPage immediately', () => {
	const { getByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	expect(getByText('Welcome to AnotherMovie.app!')).toBeTruthy();
});

it('redirects to search page on search link click', () => {
	const { getByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const searchLink = getByText('Start Searching Now!');
	fireEvent.click(searchLink);
	expect(getByText('Search for Movies')).toBeTruthy();
});

it('redirects to search page on search nav link click', () => {
	const { getByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const searchNavLink = getByText('Search');
	fireEvent.click(searchNavLink);
	expect(getByText('Search for Movies')).toBeTruthy();
});

it('redirects to login page on login nav link click', () => {
	const { getByText, getAllByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const loginNavLink = getByText('Login');
	fireEvent.click(loginNavLink);
	expect(getByText('Username')).toBeTruthy();
	expect(getAllByText('Login')).toHaveLength(3);
});

it('redirects to register page on register nav link click', () => {
	const { getByText, getAllByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	const registerNavLink = getByText('Register');
	fireEvent.click(registerNavLink);
	expect(getByText('Username')).toBeTruthy();
	expect(getAllByText('Register')).toHaveLength(3);
});
