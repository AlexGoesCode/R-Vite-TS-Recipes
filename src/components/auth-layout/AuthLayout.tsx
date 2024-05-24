import { Container, Row, Col, Button } from 'react-bootstrap';

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
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <Row className='w-100'>
        <Col
          md={{ span: 6, offset: 3 }}
          className='p-4 border rounded shadow-sm bg-white'
        >
          <h2 className='text-center mb-4'>{title}</h2>
          {children}
          <div className='d-grid gap-2'>
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
