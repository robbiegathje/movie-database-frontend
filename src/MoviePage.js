import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import MovieDatabaseAPI from './api';
import Credits from './Credits';
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
		return <h1>Loading</h1>;
	}

	console.log(movieData);

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
							<h3 key={genre.id} className="Content-genre">
								{genre.name}
							</h3>
						);
					})}
					<aside className="Content-data">
						Released {movieData.release_date}
					</aside>
					<aside className="Content-data">{movieData.runtime} minutes</aside>
					<p className="Content-data">{movieData.overview}</p>
				</Col>
			</Row>
			<VideoReel />
			<StreamingList />
			<Credits />
		</Container>
	);
};

export default MoviePage;
