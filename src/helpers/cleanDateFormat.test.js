import cleanDateFormat from './cleanDateFormat';

it('returns expected date format when provided date from API', () => {
	expect(cleanDateFormat('2008-07-14')).toBe('07/14/2008');
	expect(cleanDateFormat('1996-12-24')).toBe('12/24/1996');
	expect(cleanDateFormat('2017-10-19')).toBe('10/19/2017');
});

it('returns expected date format when provided date from backend', () => {
	expect(cleanDateFormat('2023-09-09anythingelse')).toBe('09/09/2023');
});
