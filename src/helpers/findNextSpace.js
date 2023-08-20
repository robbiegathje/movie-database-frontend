const findNextSpace = (str, startingIndex) => {
	for (let i = startingIndex; i < str.length; i++) {
		if (str[i] === ' ') {
			return i;
		} else {
			continue;
		}
	}
	return -1;
};

export default findNextSpace;
