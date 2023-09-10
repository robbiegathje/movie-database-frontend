import { render } from '@testing-library/react';
import StreamingList from './StreamingList';

const MOCK_PROVIDERS = [
	{ provider_name: 'Amazoom Zero' },
	{ provider_name: 'Disworld-' },
];

it('renders', () => {
	render(<StreamingList providers={MOCK_PROVIDERS} />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<StreamingList providers={MOCK_PROVIDERS} />);
	expect(asFragment()).toMatchSnapshot();
});

it('renders expected text', () => {
	const { getByText } = render(<StreamingList providers={MOCK_PROVIDERS} />);
	expect(getByText(MOCK_PROVIDERS[0].provider_name)).toBeTruthy();
	expect(getByText(MOCK_PROVIDERS[1].provider_name)).toBeTruthy();
});
