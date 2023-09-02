import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';

import MovieDatabaseAPI from './api';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';
import cleanDateFormat from './helpers/cleanDateFormat';

import './ContentPages.css';

const SeriesPage = ({
	checkForUser,
	favorites,
	addFavorite,
	removeFavorite,
}) => {
	const [seriesData, setSeriesData] = useState();
	const { id } = useParams();

	useEffect(() => {
		const getSeries = async () => {
			const seriesData = await MovieDatabaseAPI.getTvSeries(id);
			setSeriesData(seriesData);
		};
		getSeries();
	}, [id]);

	if (!seriesData) {
		return <Spinner></Spinner>;
	}

	const favoriteButton = favorites.find((series) => {
		return +series.api_id === +id;
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
						src={seriesData.poster_url}
						alt={`${seriesData.name} poster`}
						className="Content-poster"
					/>
				</Col>
				<Col>
					<h1 className="Content-title">{seriesData.name}</h1>
					<h2 className="Content-tagline">{seriesData.tagline}</h2>
					{seriesData.genres.map((genre) => {
						return (
							<h3 key={genre.id} className="Content-tag">
								{genre.name}
							</h3>
						);
					})}
					{seriesData.first_air_date ? (
						<aside className="Content-data">
							First Aired {cleanDateFormat(seriesData.first_air_date)}
						</aside>
					) : null}
					<aside className="Content-data">
						{seriesData.seasons} seasons ({seriesData.episodes} episodes)
					</aside>
					<aside className="Content-data">{seriesData.status}</aside>
					<p className="Content-data">{seriesData.overview}</p>
					<Row>
						{checkForUser() ? <Col>{favoriteButton}</Col> : null}
						<Col>
							<Link
								to={seriesData.imdb_url}
								target="_blank"
								rel="noopener noreferrer">
								<Button color="warning">IMDb</Button>
							</Link>
						</Col>
					</Row>
					{seriesData.streaming ? (
						<StreamingList providers={seriesData.streaming} />
					) : (
						<div>
							<h3 className="Content-tag">Not Available to Stream</h3>
						</div>
					)}
				</Col>
			</Row>
			<VideoReel
				videos={seriesData.videos.filter((video) => {
					return video.site === 'YouTube';
				})}
			/>
		</Container>
	);
};

export default SeriesPage;
