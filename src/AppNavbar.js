import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';

import TokenContext from './TokenContext';

import './AppNavbar.css';

const AppNavbar = ({ logout }) => {
	const token = useContext(TokenContext);
	const { decodedToken } = useJwt(token);
	const { id } = decodedToken || {};

	const checkForUser = () => {
		if (typeof token === 'string' && token !== '') {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Navbar>
			<NavbarBrand tag="div">
				<NavLink to="/" className="Navbar-link Navbar-brand">
					AnotherMovie.app
				</NavLink>
			</NavbarBrand>
			<Nav>
				<NavLink to="/search" className="Navbar-link">
					Search
				</NavLink>
				<NavLink to="/about" className="Navbar-link">
					About
				</NavLink>
				{checkForUser() ? (
					<>
						<NavLink to={`/users/${id}/lists`} end className="Navbar-link">
							Favorites
						</NavLink>
						<NavLink to={`/users/${id}`} end className="Navbar-link">
							Change Password
						</NavLink>
						<button onClick={logout} className="Navbar-link">
							Logout
						</button>
					</>
				) : (
					<>
						<NavLink to="/login" className="Navbar-link">
							Login
						</NavLink>
						<NavLink to="/register" className="Navbar-link">
							Register
						</NavLink>
					</>
				)}
			</Nav>
		</Navbar>
	);
};

export default AppNavbar;
