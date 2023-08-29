import { useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import {
	Button,
	Card,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
} from 'reactstrap';

import TokenContext from './TokenContext';

import './ContentPages.css';

const UserListsPage = ({ checkForUser, checkForAuthorizedUser }) => {
	const { id: paramId } = useParams();
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { id, username } = decodedToken || {};

	if (!checkForUser()) {
		return <Navigate to="/" replace={true} />;
	}

	if (!checkForAuthorizedUser(id, paramId)) {
		return <Navigate to={`/users/${id}`} replace={true} />;
	}

	return (
		<Container>
			<h1 className="Content-title">{username}'s watch lists</h1>
			<Row>
				<Col sm="6">
					<Card body>
						<CardTitle tag="h2" className="Content-tagline">
							Movie Watch List
						</CardTitle>
						<CardText className="Content-data">
							All your favorite movies (or simply add movies you want to watch!)
							in one place!
						</CardText>
						<Link to={`/movies/lists/${id}`}>
							<Button color="primary" outline>
								My List
							</Button>
						</Link>
					</Card>
				</Col>
				<Col sm="6">
					<Card body>
						<CardTitle tag="h2" className="Content-tagline">
							TV Watch List
						</CardTitle>
						<CardText className="Content-data">
							All your favorite tv series (or simply add series you want to
							watch!) in one place!
						</CardText>
						<Link to={`/tv/lists/${id}`}>
							<Button color="primary" outline>
								My List
							</Button>
						</Link>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default UserListsPage;
