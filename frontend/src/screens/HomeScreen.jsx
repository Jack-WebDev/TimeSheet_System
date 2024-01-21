import { Navbar, Nav, Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const HomeScreen = () => {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand className="text-warning logo">
                NDT Timesheet System
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <div className=" py-5">
        <Container className="d-flex justify-content-center">
          <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
            <h1 className="text-center mb-4">
              Welcome to the NDT Timesheet System
            </h1>
            <div className="d-flex">
              <LinkContainer to="/login">
                <Button variant="primary" className="managerBtn">
                  Login
                </Button>
              </LinkContainer>

              <LinkContainer to="/register">
                <Button variant="secondary" className="ms-3 adminBtn">
                  Register
                </Button>
              </LinkContainer>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;
