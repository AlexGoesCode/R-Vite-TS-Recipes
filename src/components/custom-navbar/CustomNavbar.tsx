import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonLink from '../custom-link/ButtonLink'; // Import the custom ButtonLink component
import './CustomNavbar.css';

const CustomNavbar = () => {
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Navbar expand='lg' className='navbar'>
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          Navbar scroll
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/recipes'>
              Recipes
            </Nav.Link>
          </Nav>
          <div className='d-flex align-items-center'>
            {user ? (
              <>
                <span className='me-2'>Welcome, {user}</span>
                <Button
                  variant='outline-danger'
                  onClick={handleLogout}
                  className='me-2'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <ButtonLink
                  variant='outline-success'
                  to='/login'
                  className='me-2'
                >
                  Login
                </ButtonLink>
                <ButtonLink variant='outline-primary' to='/signup'>
                  Sign Up
                </ButtonLink>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
