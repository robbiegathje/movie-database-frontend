import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { Col, Container, Row } from 'reactstrap';

import TokenContext from './TokenContext';

import './LandingPage.css';

const frontPageMovies = [
	{
		title: 'Oppenheimer',
		src: 'https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
	},
	{
		title: 'Barbie',
		src: 'https://image.tmdb.org/t/p/w780/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
	},
	{
		title: 'Star Wars',
		src: 'https://image.tmdb.org/t/p/w780/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
	},
];

const LandingPage = ({ checkForUser }) => {
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { username } = decodedToken || {};

	return (
		<Container>
			{checkForUser() ? (
				<h1>Welcome back to AnotherMovie.app, {username}!</h1>
			) : (
				<h1>Welcome to AnotherMovie.app!</h1>
			)}
			<h2>
				<Link to="/search">Start Searching Now!</Link>
			</h2>
			<hr />
			<Row>
				<h2>Why another movie app?</h2>
				<p>
					Streamlined to provide exactly what you need to decide what you want
					to watch!
				</p>
				<p>Provides trailers, streaming service availability, and more!</p>
				<p>
					Allows you to save all your "watch later" shows and movies in one
					place!
				</p>
				<p>
					Not just "another" movie app; this is the app to help you quickly find
					another movie!
				</p>
			</Row>
			<Row>
				<Col xs="4">
					<img
						src={frontPageMovies[0].src}
						alt={`${frontPageMovies[0].title} poster`}
						className="LandingPage-poster"
					/>
				</Col>
				<Col xs="4">
					<img
						src={frontPageMovies[1].src}
						alt={`${frontPageMovies[1].title} poster`}
						className="LandingPage-poster"
					/>
				</Col>
				<Col xs="4">
					<img
						src={frontPageMovies[2].src}
						alt={`${frontPageMovies[2].title} poster`}
						className="LandingPage-poster"
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingPage;
