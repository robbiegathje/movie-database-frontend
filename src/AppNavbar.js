import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavbarBrand } from 'reactstrap';

import './AppNavbar.css';

const AppNavbar = () => {
	return (
		<Navbar>
			<NavbarBrand>AnotherMovie.app</NavbarBrand>
			<Nav className="m-auto">
				<NavLink to="/search" className="Navbar-link">
					Search
				</NavLink>
				<NavLink to="/login" className="Navbar-link">
					Login
				</NavLink>
				<NavLink to="/register" className="Navbar-link">
					Register
				</NavLink>
				<NavLink to="/users/1/lists" end className="Navbar-link">
					Favorites
				</NavLink>
				<NavLink to="/users/1" end className="Navbar-link">
					Edit User
				</NavLink>
			</Nav>
		</Navbar>
	);
};

export default AppNavbar;
