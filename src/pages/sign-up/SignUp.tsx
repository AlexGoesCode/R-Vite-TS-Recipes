import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = () => {
    // Handle sign-up logic
    console.log('Signing up...', { username, password, email });
  };

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Row className='w-100'>
        <Col
          md={{ span: 6, offset: 3 }}
          className='p-4 border rounded shadow-sm bg-white'
        >
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form>
            <Form.Group className='mb-3' controlId='formEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant='primary'
              size='lg'
              onClick={handleSignUp}
              className='d-grid gap-2 col-6 mx-auto'
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;