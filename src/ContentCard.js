import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
} from 'reactstrap';

import shorten from './helpers/shorten';

const ContentCard = ({
	api_id,
	title,
	overview,
	poster_url,
	release_date,
	content,
}) => {
	return (
		<Col xs="6" sm="4" lg="3" xl="2">
			<Card>
				<CardImg top src={poster_url} />
				<CardTitle>{title}</CardTitle>
				<CardSubtitle>{release_date}</CardSubtitle>
				<CardBody>
					<CardText>{shorten(overview, 100)}</CardText>
					<Link to={`/${content}/${api_id}`}>
						<Button>See More</Button>
					</Link>
				</CardBody>
			</Card>
		</Col>
	);
};

export default ContentCard;
