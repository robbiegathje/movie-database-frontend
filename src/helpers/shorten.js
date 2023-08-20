import findNextSpace from './findNextSpace';

const shorten = (str, characterLimit) => {
	if (str.length > characterLimit) {
		const nextSpace = findNextSpace(str, characterLimit);
		if (nextSpace === -1) {
			return str;
		}
		const shortened = str.slice(0, nextSpace) + '...';
		return shortened;
	}
	return str;
};

export default shorten;
