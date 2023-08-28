import axios from 'axios';

const TOKEN_KEY = 'token';

class MovieDatabaseAPI {
	static getToken() {
		const token = localStorage.getItem(TOKEN_KEY);
		return token;
	}

	static async request(endpoint, data = {}, method = 'get') {
		const url = `/${endpoint}`;
		const headers = {
			Authorization: `Bearer ${
				MovieDatabaseAPI.getToken() ? MovieDatabaseAPI.getToken() : ''
			}`,
		};
		const params = method === 'get' ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	static async register(user) {
		let res = await this.request('auth/register', user, 'post');
		return res.token;
	}

	static async authenticate(user) {
		let res = await this.request('auth/login', user, 'post');
		return res.token;
	}

	static async changePassword(userId, password, newPassword) {
		let res = await this.request(
			`api/users/${userId}/change-password`,
			{ password, newPassword },
			'patch'
		);
		return res;
	}

	static async getFavoriteMovies(userId) {
		let res = await this.request(`api/users/${userId}/favorite-movies`);
		return res.favorites;
	}

	static async addFavoriteMovie(userId, apiId) {
		let res = await this.request(
			`api/users/${userId}/favorite-movies`,
			{ id: apiId },
			'post'
		);
		return res;
	}

	static async removeFavoriteMovie(userId, apiId) {
		let res = await this.request(
			`api/users/${userId}/favorite-movies`,
			{ id: apiId },
			'delete'
		);
		return res;
	}

	static async getFavoriteTv(userId) {
		let res = await this.request(`api/users/${userId}/favorite-tv`);
		return res.favorites;
	}

	static async addFavoriteTv(userId, apiId) {
		let res = await this.request(
			`api/users/${userId}/favorite-tv`,
			{ id: apiId },
			'post'
		);
		return res;
	}

	static async removeFavoriteTv(userId, apiId) {
		let res = await this.request(
			`api/users/${userId}/favorite-tv`,
			{ id: apiId },
			'delete'
		);
		return res;
	}

	static async getMovie(api_id) {
		const results = await this.request(`api/movies/${api_id}`);
		return results.movie;
	}

	static async searchMovies(query) {
		const results = await this.request('api/search/movies', {
			query,
		});
		return results.results;
	}

	static async getTvSeries(api_id) {
		const results = await this.request(`api/tv/${api_id}`);
		return results.series;
	}

	static async searchTv(query) {
		const results = await this.request('api/search/tv', {
			query,
		});
		return results.results;
	}
}

export default MovieDatabaseAPI;

export { TOKEN_KEY };
