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

const SearchPage = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);

	const handleChange = (event) => {
		setQuery(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
	};

	const searchMovies = async (event) => {
		const response = await MovieDatabaseAPI.searchMovies(query);
		const results = response.map((result) => {
			return { ...result, content: 'movies' };
		});
		setResults(results);
	};

	const searchTv = async (event) => {
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
					<Col xs="10">
						<Input
							id="query"
							name="query"
							placeholder="what do you want to watch?"
							value={query}
							onChange={handleChange}
						/>
					</Col>
					<Row className="mt-2">
						<Col xs="6" lg={{ offset: 6, size: 3 }} xl={{ offset: 8, size: 2 }}>
							<Button onClick={searchMovies} color="secondary" outline>
								Search for Movies
							</Button>
						</Col>
						<Col xs="6" lg="3" xl="2">
							<Button onClick={searchTv} color="secondary" outline>
								Search for TV
							</Button>
						</Col>
					</Row>
				</FormGroup>
			</Form>
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
