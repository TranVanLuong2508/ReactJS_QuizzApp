import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from "react-router-dom";
import apiService from '../../services/apiService';
import { toast } from 'react-toastify'
import userActions from '../../redux/actions/userActions';
import Language from './Language';

function Header() {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleNavigateToLogin = () => {
        navigate('/login')
    }

    const handleLogOut = async () => {
        let logOutResponse = await apiService.LogOut(account.email, account.refresh_token)
        if (logOutResponse && logOutResponse.EC === 0) {
            dispatch(userActions.UserLogOut())
            toast.success(logOutResponse.EM)
            navigate('/login')
        } else {
            toast.error(logOutResponse.EM)
        }
    }
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
                        <Language />
                        {isAuthenticated == false ?
                            <>
                                <button
                                    className='btn-login'
                                    onClick={() => { handleNavigateToLogin() }}
                                >
                                    Log in
                                </button>
                                <button className='btn-signup'>Sign up</button>
                            </>
                            :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#action/3.2"
                                    onClick={() => { handleLogOut() }}
                                >
                                    Log Out
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        }
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;