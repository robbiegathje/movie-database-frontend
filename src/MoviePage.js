import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import MovieDatabaseAPI from './api';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';

import './ContentPages.css';

const MoviePage = () => {
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
		return <h1>Loading...</h1>;
	}

	return (
		<Container>
			<Row>
				<Col xs="12" sm="5">
					<img
						src={movieData.poster_url}
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
					<aside className="Content-data">
						Released {movieData.release_date}
					</aside>
					<aside className="Content-data">{movieData.runtime} minutes</aside>
					<p className="Content-data">{movieData.overview}</p>
					<Link to={movieData.imdb_url}>
						<Button color="warning">IMDb</Button>
					</Link>
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
