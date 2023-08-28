import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { Container, Row } from 'reactstrap';

import ContentCard from './ContentCard';
import TokenContext from './TokenContext';

import './ContentPages.css';

const UserList = ({ checkForUser, favorites, removeFavorite, contentType }) => {
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { username } = decodedToken || {};

	if (!checkForUser()) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<Container>
			<h1 className="Content-title">
				{`${username}'s ${contentType === 'movies' ? 'movie' : contentType}`}{' '}
				watch list
			</h1>
			{favorites.length === 0 ? null : (
				<Row className="mt-2">
					{favorites.map((favorite) => {
						return (
							<ContentCard
								key={favorite.api_id}
								api_id={favorite.api_id}
								title={favorite.title || favorite.name}
								overview={favorite.overview}
								poster_url={favorite.poster_url}
								release_date={favorite.release_date || favorite.first_air_date}
								content={contentType}
								includeRemoveFavorite
								removeFavorite={removeFavorite}
							/>
						);
					})}
				</Row>
			)}
		</Container>
	);
};

export default UserList;
