import { useState } from 'react';

const useLocalStorage = (key) => {
	const initialValue = localStorage.getItem(key);
	const [item, setItem] = useState(initialValue);

	const setItemAndLocalStorage = (newValue) => {
		localStorage.setItem(key, newValue);
		setItem(localStorage.getItem(key));
	};
	return [item, setItemAndLocalStorage];
};

export default useLocalStorage;
