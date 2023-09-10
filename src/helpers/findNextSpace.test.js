import findNextSpace from './findNextSpace';

const MOCK_PARAGRAPH =
	'this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word. this is a long paragraph with spaces between each word.';

const NO_SPACES = 'thisisasentencewithoutanyspaces.';

it('returns the index of the next space after specified starting index', () => {
	expect(findNextSpace(MOCK_PARAGRAPH, 0)).toBe(4);
	expect(findNextSpace(MOCK_PARAGRAPH, 20)).toBe(24);
	expect(findNextSpace(MOCK_PARAGRAPH, 10000)).toBe(-1);
	expect(findNextSpace(MOCK_PARAGRAPH, 277)).toBe(-1);
	expect(findNextSpace(NO_SPACES, 0)).toBe(-1);
	expect(findNextSpace(NO_SPACES, 20)).toBe(-1);
	expect(findNextSpace(NO_SPACES, 40)).toBe(-1);
	expect(findNextSpace(NO_SPACES, 10000)).toBe(-1);
});
