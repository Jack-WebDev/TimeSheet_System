import { Nav, Container, Row, Col, Card } from "react-bootstrap";
import { FaSignOutAlt, FaHome, FaFolderOpen, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";

const ManagerDashboard = () => {
  const {user} = useAuthContext()

  const upcomingProjects = Math.floor(Math.random() * 10);
  const performanceMetrics = Math.floor(Math.random() * 100);
  const teamsWithBestResults = ["Team A", "Team B", "Team C"];
  const upcomingDeadlines = Math.floor(Math.random() * 5);
  const ongoingTasks = Math.floor(Math.random() * 20);
  const completedTasks = Math.floor(Math.random() * 30);
  const completedProjects = Math.floor(Math.random() * 5);
  const ongoingProjects = Math.floor(Math.random() * 3);

  const assignedEmployees = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Johnson" },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3 sideBar_menu">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to={"/manager"}>
                    <FaHome /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/manageTimesheets"}>
                    <FaFolderOpen /> Manage Timesheets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/generateReport"}>
                    <FaFilePdf /> Generate Reports
                  </Link>
                </li>
              </ul>

              <div className="nav-item text-nowrap logout">
                <LinkContainer to="/logout">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Out
                  </Nav.Link>
                </LinkContainer>
              </div>
            </div>
          </nav>

          <main className="col-md-9 col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Good day {user}!</h1>
            </div>

            <Container className="mt-4">
              <h2>Manager Dashboard</h2>
              <Row>
                <Col lg={3}>
                  <Card bg="info" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Upcoming Projects</Card.Title>
                      <Card.Text>{upcomingProjects}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card bg="success" text="white">
                    <Card.Body>
                      <Card.Title>Performance Metrics</Card.Title>
                      <Card.Text>{performanceMetrics}%</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Teams with the Best Results</Card.Title>
                      <Card.Text>{teamsWithBestResults.join(", ")}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className="mt-2">
                    <Card.Body>
                      <Card.Title>Upcoming Deadlines</Card.Title>
                      <Card.Text>{upcomingDeadlines}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={3}>
                  <Card bg="primary" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Ongoing Tasks</Card.Title>
                      <Card.Text>{ongoingTasks}</Card.Text>
                    </Card.Body>
                  </Card>
                  <Card bg="warning" text="white">
                    <Card.Body>
                      <Card.Title>Completed Tasks</Card.Title>
                      <Card.Text>{completedTasks}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col lg={4}>
                  <Card bg="success" text="white">
                    <Card.Body>
                      <Card.Title>Completed Projects</Card.Title>
                      <Card.Text>{completedProjects}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card bg="primary" text="white">
                    <Card.Body>
                      <Card.Title>Ongoing Projects</Card.Title>
                      <Card.Text>{ongoingProjects}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card bg="info" text="white">
                    <Card.Body>
                      <Card.Title>Assigned Employees</Card.Title>
                      <ul>
                        {assignedEmployees.map((employee) => (
                          <li key={employee.id}>{employee.name}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </main>
        </div>
      </div>
    </>
  );
};

export default ManagerDashboard;
