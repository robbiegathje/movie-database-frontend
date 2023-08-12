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
		const response = await MovieDatabaseAPI.searchMovies(query);
		setResults(response);
	};

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<FormGroup row>
					<Label xs="2" for="query">
						Search:
					</Label>
					<Col xs="8">
						<Input
							id="query"
							name="query"
							placeholder="what do you want to watch?"
							value={query}
							onChange={handleChange}
						/>
					</Col>
					<Col xs="2">
						<Button>See Results!</Button>
					</Col>
				</FormGroup>
			</Form>
			{results.length === 0 ? null : (
				<Row>
					{results.map((movie) => {
						return (
							<ContentCard
								key={movie.api_id}
								api_id={movie.api_id}
								title={movie.title}
								overview={movie.overview}
								poster_url={movie.poster_url}
								release_date={movie.release_date}
							/>
						);
					})}
				</Row>
			)}
		</Container>
	);
};

export default SearchPage;
