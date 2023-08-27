import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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

const INITIAL_STATE = {
	username: '',
	password: '',
};

const UserLoginPage = ({ login, checkForUser }) => {
	const [formData, setFormData] = useState(INITIAL_STATE);
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	if (checkForUser()) {
		return <Navigate to="/" replace={true} />;
	}

	const handleChange = (event) => {
		setFormData((data) => {
			return { ...data, [event.target.name]: event.target.value };
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login(formData);
		} catch (errorMessages) {
			setErrors([...errorMessages]);
			setFormData(INITIAL_STATE);
			return;
		}
		navigate('/search');
	};

	return (
		<Container>
			<Row>
				<h1>Login</h1>
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
								id="username"
								type="text"
								name="username"
								value={formData['username']}
								onChange={handleChange}
							/>
							<Label for="username">Username</Label>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Input
								id="password"
								type="password"
								name="password"
								value={formData['password']}
								onChange={handleChange}
							/>
							<Label for="password">Password</Label>
						</FormGroup>
					</Col>
					<Button color="success">Login</Button>
				</Row>
			</Form>
		</Container>
	);
};

export default UserLoginPage;
