import {
	Card,
	CardBody,
	CardImg,
	CardSubtitle,
	CardText,
	CardTitle,
	Col,
} from 'reactstrap';
import shorten from './helpers/shorten';

const ContentCard = ({ api_id, title, overview, poster_url, release_date }) => {
	return (
		<Col xs="6" sm="4" lg="3" xl="2" className="mt-5">
			<Card>
				<CardImg top src={poster_url} />
				<CardTitle>{title}</CardTitle>
				<CardSubtitle>{release_date}</CardSubtitle>
				<CardBody>
					<CardText>{shorten(overview, 140)}</CardText>
				</CardBody>
			</Card>
		</Col>
	);
};

export default ContentCard;
