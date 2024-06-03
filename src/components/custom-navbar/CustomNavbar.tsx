import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from '../../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonLink from '../custom-link/ButtonLink';
import './CustomNavbar.css';
import { useContext } from 'react';

const CustomNavbar = () => {
  // const { user, logout } = useAuth();
  const { logout, user } = useContext(AuthContext);

  return (
    // <Navbar expand='lg' className='navbar'>
    //   <Container fluid>
    //     <Navbar.Brand as={Link} to='/'>
    //       Flavours.Dance!
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls='navbarScroll' />
    //     <Navbar.Collapse id='navbarScroll' className='justify-content-between'>
    //       <Nav
    //         className='me-auto my-2 my-lg-0'
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll
    //       >
    //         <Nav.Link as={Link} to='/'>
    //           Home
    //         </Nav.Link>
    //         <Nav.Link as={Link} to='/recipes'>
    //           Recipes
    //         </Nav.Link>

    //         {user ? (
    //           <>
    //             <Nav.Link as={Link} to='/create-recipe'>
    //               Create Recipe
    //             </Nav.Link>
    //             <span className='me-2'>Hey, {user.email}</span>
    //             <Button
    //               variant='outline-danger'
    //               onClick={logout}
    //               className='me-2-logout'
    //             >
    //               Logout
    //             </Button>
    //           </>
    //         ) : (
    //           <>
    //             <Nav.Link as={Link} to='/login'>
    //               Login
    //             </Nav.Link>
    //             <Nav.Link as={Link} to='/signup'>
    //               Sign Up
    //             </Nav.Link>
    //           </>
    //         )}
    //       </Nav>
    //       <div className='d-flex align-items-center'></div>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    //! Bootstrap example
    <Navbar expand='lg' className='bg-body-tertiary'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Flavours.Dance!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            {/* <Nav.Link as={Link} to={'/home'}>
              Home
            </Nav.Link> */}
            <Nav.Link as={Link} to={'/recipes'}>
              Recipes
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to='/create-recipe'>
                  Create Recipe
                </Nav.Link>
                <span className='me-2'>Hey, {user.email}</span>
                <Button
                  variant='outline-danger'
                  onClick={logout}
                  className='me-2-logout'
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
