import { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthContext, useAuth } from '../../context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const Login = () => {
  // define the Login component
  const [username, setUsername] = useState(''); // useState hooks to declare
  const [password, setPassword] = useState(''); // username and password

  // const { setUser } = useAuth(); // set the user state after a successful login.
  const { login, setError, error } = useContext(AuthContext);
  const handleLogin = async () => {
    // define the handleLogin function

    // check if password has >= 6 characters
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    login(username, password);
  };

  // Bootstrap login form
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
                placeholder='e-mail'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='min. 6 characters'
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
