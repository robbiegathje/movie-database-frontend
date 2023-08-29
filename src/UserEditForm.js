import { useContext, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import {
	Alert,
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
import TokenContext from './TokenContext';

const INITIAL_STATE = {
	password: '',
	newPassword: '',
};

const UserEditForm = ({ checkForUser, checkForAuthorizedUser }) => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState([]);
	const [working, setWorking] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { id: userId } = decodedToken || {};

	if (!checkForUser()) {
		return <Navigate to="/" replace={true} />;
	}

	if (!checkForAuthorizedUser(userId, id)) {
		return <Navigate to={`/users/${userId}`} replace={true} />;
	}

	const handleChange = (event) => {
		setFormData((data) => {
			return { ...data, [event.target.name]: event.target.value };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setWorking(true);
			await MovieDatabaseAPI.changePassword(
				id,
				formData['password'],
				formData['newPassword']
			);
		} catch (errorMessages) {
			setWorking(false);
			setErrors([...errorMessages]);
			setFormData(INITIAL_STATE);
			return;
		}
		navigate('/search');
	};

	return (
		<Container>
			<Row>
				<h1>Change Password</h1>
			</Row>
			<Form onSubmit={handleSubmit}>
				{errors.map((error, index) => {
					return (
						<Alert key={`alert-${index}`} color="danger">
							{error}
						</Alert>
					);
				})}
				<Row>
					<Col>
						<FormGroup>
							<Input
								id="password"
								type="password"
								name="password"
								value={formData['password']}
								onChange={handleChange}
							/>
							<Label for="password">Current Password</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Input
								id="newPassword"
								type="password"
								name="newPassword"
								value={formData['newPassword']}
								onChange={handleChange}
							/>
							<Label for="newPassword">New Password</Label>
						</FormGroup>
					</Col>
					{working ? (
						<Alert color="warning">Working...</Alert>
					) : (
						<Button color="success">Change Password</Button>
					)}
				</Row>
			</Form>
		</Container>
	);
};

export default UserEditForm;
