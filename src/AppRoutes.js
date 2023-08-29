import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useJwt } from 'react-jwt';

import MovieDatabaseAPI from './api';
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
	const [favoriteMovies, setFavoriteMovies] = useState([]);
	const [favoriteTv, setFavoriteTv] = useState([]);
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { id } = decodedToken || {};

	const checkForUser = () => {
		if (typeof token === 'string' && token !== '') {
			return true;
		} else {
			return false;
		}
	};

	const checkForAuthorizedUser = (userId, paramId) => {
		if (+userId === +paramId) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		const getFavoriteMovies = async () => {
			const response = await MovieDatabaseAPI.getFavoriteMovies(id);
			setFavoriteMovies(response);
		};
		const getFavoriteTv = async () => {
			const response = await MovieDatabaseAPI.getFavoriteTv(id);
			setFavoriteTv(response);
		};
		if (id) {
			getFavoriteMovies();
			getFavoriteTv();
		}
	}, [id]);

	const addFavorite = async (contentType, api_id) => {
		if (contentType === 'movies') {
			await MovieDatabaseAPI.addFavoriteMovie(id, +api_id);
			const movie = await MovieDatabaseAPI.getMovie(+api_id);
			setFavoriteMovies((favorites) => {
				return [...favorites, movie];
			});
		} else if (contentType === 'tv') {
			await MovieDatabaseAPI.addFavoriteTv(id, +api_id);
			const series = await MovieDatabaseAPI.getTvSeries(+api_id);
			setFavoriteTv((favorites) => {
				return [...favorites, series];
			});
		}
	};

	const removeFavorite = async (contentType, api_id) => {
		if (contentType === 'movies') {
			await MovieDatabaseAPI.removeFavoriteMovie(id, +api_id);
			setFavoriteMovies(
				favoriteMovies.filter((movie) => {
					return movie.api_id !== +api_id;
				})
			);
		} else if (contentType === 'tv') {
			await MovieDatabaseAPI.removeFavoriteTv(id, +api_id);
			setFavoriteTv(
				favoriteTv.filter((series) => {
					return series.api_id !== +api_id;
				})
			);
		}
	};

	return (
		<Routes>
			<Route path="/" element={<LandingPage checkForUser={checkForUser} />} />
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
				element={
					<UserEditForm
						checkForUser={checkForUser}
						checkForAuthorizedUser={checkForAuthorizedUser}
					/>
				}
			/>
			<Route
				path="/users/:id/lists"
				element={
					<UserListsPage
						checkForUser={checkForUser}
						checkForAuthorizedUser={checkForAuthorizedUser}
					/>
				}
			/>
			<Route
				path="/movies/lists/:id"
				element={
					<UserList
						checkForUser={checkForUser}
						checkForAuthorizedUser={checkForAuthorizedUser}
						favorites={favoriteMovies}
						removeFavorite={(api_id) => {
							removeFavorite('movies', api_id);
						}}
						contentType="movies"
					/>
				}
			/>
			<Route
				path="/tv/lists/:id"
				element={
					<UserList
						checkForUser={checkForUser}
						checkForAuthorizedUser={checkForAuthorizedUser}
						favorites={favoriteTv}
						removeFavorite={(api_id) => {
							removeFavorite('tv', api_id);
						}}
						contentType="tv"
					/>
				}
			/>
			<Route path="/search" element={<SearchPage />} />
			<Route
				path="/movies/:id"
				element={
					<MoviePage
						checkForUser={checkForUser}
						favorites={favoriteMovies}
						addFavorite={(api_id) => {
							addFavorite('movies', api_id);
						}}
						removeFavorite={(api_id) => {
							removeFavorite('movies', api_id);
						}}
					/>
				}
			/>
			<Route
				path="/tv/:id"
				element={
					<SeriesPage
						checkForUser={checkForUser}
						favorites={favoriteTv}
						addFavorite={(api_id) => {
							addFavorite('tv', api_id);
						}}
						removeFavorite={(api_id) => {
							removeFavorite('tv', api_id);
						}}
					/>
				}
			/>
		</Routes>
	);
};

export default AppRoutes;
