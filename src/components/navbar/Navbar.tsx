import React, { useState } from 'react'; // 1.1
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';

const NavScrollExample: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState(''); // TypeScript infers the type as string
  // (1.2) State to hold the search query

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update the state with the new query
    console.log('User is typing:', event.target.value); // Log the current input value
  }; // (1.3) Handler for input change events

  
  const handleSearchClick = () => {
    console.log('Search button clicked. Current search query:', searchQuery); // Log the search query
  }; // (1.4) Handler for search button click events


  // Bootstrap Navbar
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>Link</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSearchClick(); }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery} // (1.5) Bind the input value to the state
              onChange={handleSearchChange} // (1.6) Handle input changes
            />
            <Button variant="outline-success" onClick={handleSearchClick}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;