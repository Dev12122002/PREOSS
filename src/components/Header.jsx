import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Header({ isLoggedIn, setLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        navigate('/login');
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary m-0">
            <Container>
                <Navbar.Brand href="#home">PREOSS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    {!isLoggedIn && <Nav className="ml-auto">
                        <Link to="/login" className='nav-link'>Login</Link>
                    </Nav>}
                    {isLoggedIn && <Nav className="ml-auto" onClick={handleLogout}>
                        <Link className='nav-link'>Logout</Link>
                    </Nav>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}