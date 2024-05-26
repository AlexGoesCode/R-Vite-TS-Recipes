import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAppContext } from '../../context/AppContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAppContext();

  const handleLogin = async () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      setUser(userCredential.user.email); // Set user email or other user data as needed
      console.log('User logged in:', userCredential.user);
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Failed to log in. Please try again.');
    }
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
          <h2 className='text-center mb-4'>Login</h2>
          {error && <p className='text-danger'>{error}</p>}
          <Form>
            <Form.Group className='mb-3' controlId='formUsername'>
              <Form.Label>E-mail</Form.Label>
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
              onClick={handleLogin}
              className='d-grid gap-2 col-6 mx-auto'
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
