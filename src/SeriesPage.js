import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import MovieDatabaseAPI from './api';
import StreamingList from './StreamingList';
import VideoReel from './VideoReel';

import './ContentPages.css';

const SeriesPage = () => {
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
		return <h1>Loading...</h1>;
	}

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
					<aside className="Content-data">
						First Aired {seriesData.first_air_date}
					</aside>
					<aside className="Content-data">
						{seriesData.seasons} seasons ({seriesData.episodes} episodes)
					</aside>
					<aside className="Content-data">{seriesData.status}</aside>
					<p className="Content-data">{seriesData.overview}</p>
					<Link to={seriesData.imdb_url}>
						<Button color="warning">IMDb</Button>
					</Link>
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
