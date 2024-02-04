import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../components/NotFound.css"

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for might be in another dimension.</p>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
