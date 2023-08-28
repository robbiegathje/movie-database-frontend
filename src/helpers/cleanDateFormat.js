const cleanDateFormat = (date) => {
	const year = date.slice(0, 4);
	const month = date.slice(5, 7);
	const day = date.length > 9 ? date.slice(8, 10) : date.slice(8);

	return `${month}/${day}/${year}`;
};

export default cleanDateFormat;
