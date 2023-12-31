import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';

import MovieDatabaseAPI from './api';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';
import cleanDateFormat from './helpers/cleanDateFormat';

import defaultPoster from './static/images/default-poster.jpg';
import './ContentPages.css';

const MoviePage = ({
	checkForUser,
	favorites,
	addFavorite,
	removeFavorite,
}) => {
	const [movieData, setMovieData] = useState();
	const { id } = useParams();

	useEffect(() => {
		const getMovie = async () => {
			const movieData = await MovieDatabaseAPI.getMovie(id);
			setMovieData(movieData);
		};
		getMovie();
	}, [id]);

	if (!movieData) {
		return <Spinner></Spinner>;
	}

	const favoriteButton = favorites.find((movie) => {
		return +movie.api_id === +id;
	}) ? (
		<Button
			onClick={() => {
				removeFavorite(id);
			}}
			color="danger">
			Remove Favorite
		</Button>
	) : (
		<Button
			onClick={() => {
				addFavorite(id);
			}}
			color="success">
			Add to Favorites
		</Button>
	);

	return (
		<Container>
			<Row>
				<Col xs="12" sm="5">
					<img
						src={movieData.poster_url ? movieData.poster_url : defaultPoster}
						alt={`${movieData.title} poster`}
						className="Content-poster"
					/>
				</Col>
				<Col>
					<h1 className="Content-title">{movieData.title}</h1>
					<h2 className="Content-tagline">{movieData.tagline}</h2>
					{movieData.genres.map((genre) => {
						return (
							<h3 key={genre.id} className="Content-tag">
								{genre.name}
							</h3>
						);
					})}
					{movieData.release_date ? (
						<aside className="Content-data">
							Released {cleanDateFormat(movieData.release_date)}
						</aside>
					) : null}
					<aside className="Content-data">{movieData.runtime} minutes</aside>
					<p className="Content-data">{movieData.overview}</p>
					<Row>
						{checkForUser() ? <Col>{favoriteButton}</Col> : null}
						<Col>
							<Link
								to={movieData.imdb_url}
								target="_blank"
								rel="noopener noreferrer">
								<Button color="warning">IMDb</Button>
							</Link>
						</Col>
					</Row>
					{movieData.streaming ? (
						<StreamingList providers={movieData.streaming} />
					) : (
						<div>
							<h3 className="Content-tag">Not Available to Stream</h3>
						</div>
					)}
				</Col>
			</Row>
			<VideoReel
				videos={movieData.videos.filter((video) => {
					return video.site === 'YouTube';
				})}
			/>
		</Container>
	);
};

export default MoviePage;
