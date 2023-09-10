import shorten from './shorten';

const MOCK_PARAGRAPH =
	'this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word.';

const NO_SPACES = 'thisisasentencewithoutanyspaces.';

it('shortens any string to the next space after the specified character limit', () => {
	expect(shorten(MOCK_PARAGRAPH, 100)).toBe(
		'this is a long paragraph with spaces between each word. this is a long paragraph with spaces between...'
	);
	expect(shorten(MOCK_PARAGRAPH, 98)).toBe(
		'this is a long paragraph with spaces between each word. this is a long paragraph with spaces between...'
	);
	expect(shorten(MOCK_PARAGRAPH, 5)).toBe('this is...');
	expect(shorten(NO_SPACES, 5)).toBe(NO_SPACES);
});
