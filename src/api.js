import axios from 'axios';

class MovieDatabaseAPI {
	static token;

	static async request(endpoint, data = {}, method = 'get') {
		const url = `/${endpoint}`;
		const headers = {
			Authorization: `Bearer ${MovieDatabaseAPI.token}`,
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

	static async register() {}
	static async login() {}
	static async changePassword() {}
	static async changeUsername() {}
	static async getFavoriteMovies() {}
	static async addFavoriteMovie() {}
	static async removeFavoriteMovie() {}
	static async getFavoriteTv() {}
	static async addFavoriteTv() {}
	static async removeFavoriteTv() {}
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

MovieDatabaseAPI.token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyb2JiaWUiLCJpYXQiOjE2OTE3MTcwOTl9.rlrND6QeZuZ3Xkp72TxeMOL4k4bXtBOB2QpwyJEHlJc';

export default MovieDatabaseAPI;
