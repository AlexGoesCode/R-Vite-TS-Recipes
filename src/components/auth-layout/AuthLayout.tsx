import { Container, Row, Col, Button } from 'react-bootstrap';
import './AuthLayout.css';

interface AuthLayoutProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
}

const AuthLayout = ({
  title,
  buttonText,
  onButtonClick,
  children,
}: AuthLayoutProps) => {
  return (
    <Container className='auth-layout-container'>
      <Row className='auth-layout-row'>
        <Col className='auth-layout-col'>
          <h2 className='text-center mb-4'>{title}</h2>
          {children}
          <div className='d-grid gap-2 mt-3'>
            <Button variant='primary' size='lg' onClick={onButtonClick}>
              {buttonText}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthLayout;
