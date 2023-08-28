import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { Col, Container, Row } from 'reactstrap';

import TokenContext from './TokenContext';

import './LandingPage.css';

const LandingPage = ({ checkForUser }) => {
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { username } = decodedToken || {};

	return (
		<Container>
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
			{checkForUser() ? (
				<h1>Welcome back to AnotherMovie.app, {username}!</h1>
			) : (
				<h1>Welcome to AnotherMovie.app!</h1>
			)}
			<h2>
				<Link to="/search" className="LandingPage-link">
					Start Searching Now!
				</Link>
			</h2>
			<hr />
			<Row>
				<h2>Special Thanks</h2>
				<p>
					To my wife for all your love, support, encouragement, help, and design
					advice!
				</p>
				<p>
					And to The Movie Database, without which I would have no film & tv
					data!
				</p>
			</Row>
			<Row>
				<Col xs={{ offset: 3, size: 6 }}>
					<img
						src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
						alt="TMDb logo"
					/>
				</Col>
			</Row>
			<hr />
			<Row>
				<p>
					This product uses the TMDB API but is not endorsed or certified by
					TMDB.
				</p>
			</Row>
			<hr />
			<Row>
				<h2>Website by James "Robbie" Gathje</h2>
				<Col xs={{ offset: 3, size: 3 }}>
					<a
						href="https://github.com/robbiegathje/movie-database"
						className="LandingPage-link">
						GitHub
					</a>
				</Col>
				<Col xs="3">
					<a
						href="https://www.linkedin.com/in/jamesrgathje/"
						className="LandingPage-link">
						LinkedIn
					</a>
				</Col>
			</Row>
		</Container>
	);
};

export default LandingPage;
