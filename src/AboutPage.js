import { Col, Container, Row } from 'reactstrap';

const AboutPage = () => {
	return (
		<Container>
			<Row>
				<h2>Website by James "Robbie" Gathje</h2>
				<Col xs={{ offset: 3, size: 3 }}>
					<a href="https://github.com/robbiegathje/movie-database">GitHub</a>
				</Col>
				<Col xs="3">
					<a href="https://www.linkedin.com/in/jamesrgathje/">LinkedIn</a>
				</Col>
			</Row>
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
		</Container>
	);
};

export default AboutPage;
