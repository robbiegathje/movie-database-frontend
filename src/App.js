import { useNavigate } from 'react-router-dom';

import AppNavbar from './AppNavbar';
import AppRoutes from './AppRoutes';
import MovieDatabaseAPI, { TOKEN_KEY } from './api';
import TokenContext from './TokenContext';
import useLocalStorage from './hooks/useLocalStorage';

import './App.css';

const App = () => {
	const [token, setToken] = useLocalStorage(TOKEN_KEY);
	const navigate = useNavigate();

	const signup = (user) => {
		const register = async () => {
			const res = await MovieDatabaseAPI.register(user);
			setToken(res);
		};
		register();
	};

	const login = (user) => {
		const authenticate = async () => {
			const res = await MovieDatabaseAPI.authenticate(user);
			setToken(res);
		};
		authenticate();
	};

	const logout = () => {
		setToken('');
		navigate('/');
	};

	return (
		<TokenContext.Provider value={token}>
			<div className="App">
				<AppNavbar logout={logout} />
				<AppRoutes signup={signup} login={login} />
			</div>
		</TokenContext.Provider>
	);
};

export default App;
