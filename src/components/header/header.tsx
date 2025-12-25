import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
import { userData } from '../../redux/actions/action';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../authContext';
import { useDispatch } from 'react-redux';
import './header.css';

const Header = () => {
    const auth = useContext(AuthContext);
    const dispatch = useDispatch();

    const handleLogout = () => {
        auth?.logout();
        dispatch(userData(null));
    };
    return (
        <>
            <Navbar expand="lg" className="bg-transparent shadow-sm">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} className='logo' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="m-auto my-2 my-lg-0"
                            navbarScroll
                        >
                            <Link to="/" className='nav-link'>Home</Link>
                            <Link to="/aboutUs" className='nav-link'>About Us</Link>
                            <Link to="/services" className='nav-link'>Services</Link>
                            <Link to="/contactUs" className='nav-link'>Contact Us</Link>
                            { auth?.token ? <Link to="/dashboard" className='nav-link'>Dashboard</Link> : ''}
                        </Nav>
                        {
                             auth?.token ? <button onClick={() => { handleLogout() }} className='btnPrimary mt-lg-0 d-inline-block small'>Logout</button> 
                             : <Link to="/signIn" className='btnPrimary mt-lg-0 d-inline-block small'>Login</Link>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;