import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ContentCard from './ContentCard';
import shorten from './helpers/shorten';

it('renders', () => {
	render(
		<MemoryRouter>
			<ContentCard
				api_id={155}
				title="The Dark Knight"
				overview="Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
				poster_url="https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
				release_date="2008-07-14"
				content="movies"
			/>
		</MemoryRouter>
	);
});

it('matches snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter>
			<ContentCard
				api_id={155}
				title="The Dark Knight"
				overview="Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
				poster_url="https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
				release_date="2008-07-14"
				content="movies"
			/>
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});

it('renders expected text', () => {
	const { getByText } = render(
		<MemoryRouter>
			<ContentCard
				api_id={155}
				title="The Dark Knight"
				overview="Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
				poster_url="https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
				release_date="2008-07-14"
				content="movies"
			/>
		</MemoryRouter>
	);
	expect(getByText('See More')).toBeTruthy();
	expect(getByText('The Dark Knight')).toBeTruthy();
	expect(
		getByText(
			shorten(
				'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
				100
			)
		)
	).toBeTruthy();
});
