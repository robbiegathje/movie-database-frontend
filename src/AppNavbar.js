import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';

import TokenContext from './TokenContext';

import './AppNavbar.css';

const AppNavbar = ({ logout }) => {
	const token = useContext(TokenContext);

	const checkForUser = () => {
		if (typeof token === 'string' && token !== '') {
			return true;
		} else {
			return false;
		}
	};

	return (
		<Navbar>
			<NavbarBrand>
				<NavLink to="/" className="Navbar-link Navbar-brand">
					AnotherMovie.app
				</NavLink>
			</NavbarBrand>
			<Nav>
				<NavLink to="/search" className="Navbar-link">
					Search
				</NavLink>
				{checkForUser() ? (
					<>
						<NavLink to="/users/1/lists" end className="Navbar-link">
							Favorites
						</NavLink>
						<NavLink to="/users/1" end className="Navbar-link">
							Edit User
						</NavLink>
						<a onClick={logout} className="Navbar-link">
							Logout
						</a>
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
