import { useState } from 'react';
import {
	Button,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';

import MovieDatabaseAPI from './api';
import ContentCard from './ContentCard';

import './SearchPage.css';

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [searchInitiated, setSearchInitiated] = useState(false);
	const [contentType, setContentType] = useState('movies');
	const [results, setResults] = useState([]);

	const handleChange = (event) => {
		setQuery(event.target.value);
	};

	const handleToggle = (event) => {
		if (event.target.checked) {
			setContentType('tv');
		} else {
			setContentType('movies');
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSearchInitiated(true);
		if (contentType === 'movies') {
			searchMovies();
		} else {
			searchTv();
		}
	};

	const searchMovies = async () => {
		const response = await MovieDatabaseAPI.searchMovies(query);
		const results = response.map((result) => {
			return { ...result, content: 'movies' };
		});
		setResults(results);
	};

	const searchTv = async () => {
		const response = await MovieDatabaseAPI.searchTv(query);
		const results = response.map((result) => {
			return { ...result, content: 'tv' };
		});
		setResults(results);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<FormGroup row className="mt-2">
					<Label xs="2" for="query">
						Search:
					</Label>
					<Col xs="10" md="6" lg="7" xl="8">
						<Input
							id="query"
							name="query"
							placeholder="what do you want to watch?"
							value={query}
							onChange={handleChange}
						/>
					</Col>
					<Col xs="12" md="4" lg="3" xl="2">
						<Row>
							<Col>
								<span>Movies</span>
							</Col>
							<Col>
								<input
									type="checkbox"
									onChange={handleToggle}
									id="toggle"
									className="checkbox"
								/>
								<label htmlFor="toggle" className="switch"></label>
							</Col>
							<Col>
								<span>TV</span>
							</Col>
						</Row>
					</Col>
					<Row className="mt-2">
						<Col
							xs={{ size: 12 }}
							md={{ offset: 4, size: 4 }}
							lg={{ offset: 6, size: 3 }}
							xl={{ offset: 8, size: 2 }}>
							{contentType === 'movies' ? (
								<Button color="success">Search for Movies</Button>
							) : (
								<Button color="warning">Search for TV</Button>
							)}
						</Col>
					</Row>
				</FormGroup>
			</Form>
			{searchInitiated ? <h2>{results.length} Results Found</h2> : null}
			{results.length === 0 ? null : (
				<Row className="mt-2">
					{results.map((result) => {
						return (
							<ContentCard
								key={result.api_id}
								api_id={result.api_id}
								title={result.title || result.name}
								overview={result.overview}
								poster_url={result.poster_url}
								release_date={result.release_date || result.first_air_date}
								content={result.content}
							/>
						);
					})}
				</Row>
			)}
		</Container>
	);
};

export default SearchPage;
