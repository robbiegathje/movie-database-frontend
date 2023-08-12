import AppNavbar from './AppNavbar';
import AppRoutes from './AppRoutes';

import './App.css';

const App = () => {
	return (
		<div className="App">
			<h1>Another Movie</h1>
			<AppNavbar />
			<AppRoutes />
		</div>
	);
};

export default App;
