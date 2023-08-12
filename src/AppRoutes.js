import { Route, Routes } from 'react-router-dom';

import MoviePage from './MoviePage';
import SearchPage from './SearchPage';
import SeriesPage from './SeriesPage';
import UserEditForm from './UserEditForm';
import UserList from './UserList';
import UserListsPage from './UserListsPage';
import UserLoginPage from './UserLoginPage';
import UserRegistrationPage from './UserRegistrationPage';

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/register" element={<UserRegistrationPage />} />
			<Route path="/login" element={<UserLoginPage />} />
			<Route path="/users/:id" element={<UserEditForm />} />
			<Route path="/users/:id/lists" element={<UserListsPage />} />
			<Route path="/movies/lists/:id" element={<UserList />} />
			<Route path="/tv/lists/:id" element={<UserList />} />
			<Route path="/search" element={<SearchPage />} />
			<Route path="/movies/:id" element={<MoviePage />} />
			<Route path="/tv/:id" element={<SeriesPage />} />
		</Routes>
	);
};

export default AppRoutes;
