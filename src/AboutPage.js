import { Col, Container, Row } from 'reactstrap';

const AboutPage = () => {
	return (
		<Container>
			<Row>
				<h2>Website by James "Robbie" Gathje</h2>
				<Col xs={{ offset: 3, size: 3 }}>
					<a
						href="https://github.com/robbiegathje/movie-database"
						target="_blank"
						rel="noopener noreferrer">
						GitHub
					</a>
				</Col>
				<Col xs="3">
					<a
						href="https://www.linkedin.com/in/jamesrgathje/"
						target="_blank"
						rel="noopener noreferrer">
						LinkedIn
					</a>
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
					Default Movie / TV Series Poster Photo by{' '}
					<a
						href="https://unsplash.com/@ajeetmestry?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						target="_blank"
						rel="noopener noreferrer">
						Ajeet Mestry
					</a>{' '}
					on{' '}
					<a
						href="https://unsplash.com/photos/UBhpOIHnazM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
						target="_blank"
						rel="noopener noreferrer">
						Unsplash
					</a>
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
