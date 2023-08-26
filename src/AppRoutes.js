import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';
import MoviePage from './MoviePage';
import SearchPage from './SearchPage';
import SeriesPage from './SeriesPage';
import TokenContext from './TokenContext';
import UserEditForm from './UserEditForm';
import UserList from './UserList';
import UserListsPage from './UserListsPage';
import UserLoginPage from './UserLoginPage';
import UserRegistrationPage from './UserRegistrationPage';

const AppRoutes = ({ login, signup }) => {
	const token = useContext(TokenContext);

	const checkForUser = () => {
		if (typeof token === 'string' && token !== '') {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Routes>
			<Route path="/" element={<LandingPage />} checkForUser={checkForUser} />
			<Route
				path="/register"
				element={
					<UserRegistrationPage signup={signup} checkForUser={checkForUser} />
				}
			/>
			<Route
				path="/login"
				element={<UserLoginPage login={login} checkForUser={checkForUser} />}
			/>
			<Route
				path="/users/:id"
				element={<UserEditForm checkForUser={checkForUser} />}
			/>
			<Route
				path="/users/:id/lists"
				element={<UserListsPage checkForUser={checkForUser} />}
			/>
			<Route
				path="/movies/lists/:id"
				element={<UserList checkForUser={checkForUser} />}
			/>
			<Route
				path="/tv/lists/:id"
				element={<UserList checkForUser={checkForUser} />}
			/>
			<Route path="/search" element={<SearchPage />} />
			<Route path="/movies/:id" element={<MoviePage />} />
			<Route path="/tv/:id" element={<SeriesPage />} />
		</Routes>
	);
};

export default AppRoutes;
