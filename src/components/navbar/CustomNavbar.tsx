// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './CustomNavbar.css';

// interface NavbarProps {
//   onSearch: (query: string) => void;
// }

const CustomNavbar = () => {
  const { user, setUser } = useAppContext();

  const handleLogin = () => {
    setUser('John Doe'); // Example user login
  };

  const handleLogout = () => {
    setUser(null);
  };
  // Bootstrap Navbar
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
            <Nav.Link as={Link} to='recipes'>
              Recipes
            </Nav.Link>
          </Nav>
          <div className='d-flex align-items-center'>
            {user ? (
              <>
                <span className='me-2'>Welcome, {user}</span>
                <Button variant='outline-danger' onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant='outline-success' onClick={handleLogin}>
                Login
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
