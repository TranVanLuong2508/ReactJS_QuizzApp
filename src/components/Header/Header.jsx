import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to={'/'} className='navbar-brand'>Quizz App</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className='nav-link'>Home</NavLink>
                        <NavLink to={'/users'} className='nav-link'>Users</NavLink>
                        <NavLink to={'/admins'} className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        <button className='btn-login'>Log in</button>
                        <button className='btn-signup'>Sign up</button>
                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Log In</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Log Out</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown> */}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;