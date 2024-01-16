
import { Navbar, Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const HomeScreen = () => {

  return (
    <>
      <header>
          <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-warning logo">NDT Timesheet System</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
      </header>

      <div className=" py-5">
        <Container className="d-flex justify-content-center">
          <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
            <h1 className="text-center mb-4">Welcome to the NDT Timesheet System</h1>
            <p className="text-center mb-4 leading_text">
              I would like to sign in as:
            </p>
            <div className="d-flex">
              <LinkContainer to="/employeeLogin">
                <Button variant="primary" className="me-3 employeeBtn">
                  Employee
                </Button>
              </LinkContainer>

              <LinkContainer to="/managerLogin">
                <Button variant="secondary" className="managerBtn">Manager</Button>
              </LinkContainer>

              <LinkContainer to="/adminLogin">
                <Button variant="success" className="ms-3 adminBtn">Admin</Button>
              </LinkContainer>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen;
