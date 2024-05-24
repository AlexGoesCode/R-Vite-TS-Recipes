import React, { useState } from 'react';
import AuthLayout from '../../components/auth-layout/AuthLayout';
import { Form } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Logging in...', { username, password });
  };

  return (
    <AuthLayout title='Login' buttonText='Login' onButtonClick={handleLogin}>
      <Form>
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
      </Form>
    </AuthLayout>
  );
};

export default Login;
