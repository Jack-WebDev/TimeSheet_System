import { Nav, Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHome,
  FaPeopleArrows,
  FaBuilding,
  FaBookOpen,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { user } = useAuthContext();
  const totalEmployees = Math.floor(Math.random() * 1000) + 200;
  const totalDepartments = Math.floor(Math.random() * 10) + 5;

  const upcomingEvents = [
    "Team Building",
    "Product Launch",
    "Quarterly Review",
  ];

  const trainingPrograms = [
    "Web Development Workshop - Jan 25-27",
    "Leadership Training Series - Feb 5-10",
    "Sales Techniques Seminar - Mar 3",
  ];

  const announcements = [
    "Upcoming Town Hall meeting on Friday at 3 PM.",
    "New company policies in effect starting next month.",
    "Welcome our new CEO, Alex Thompson.",
  ];

  const recentActivities = [
    "New employee hired in Marketing department.",
    "Completed project XYZ ahead of schedule.",
    "Employee of the month: Sarah Johnson.",
  ];

  const employees = [
    {
      name: "Jack Mabaso",
      position: "Software Engineer",
      department: "Engineering",
    },
    {
      name: "Sibahle Ndamase",
      position: "Marketing Specialist",
      department: "Marketing",
    },
    {
      name: "Lerato Molutsi",
      position: "Head of Public Relations",
      department: "Public Relations",
    },
  ];

  const managers = [
    {
      name: "Alice Johnson",
      position: "Engineering Manager",
      achievements: "Led successful product launch.",
    },
    {
      name: "Bob Thompson",
      position: "Marketing Manager",
      achievements: "Increased customer engagement by 20%.",
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className={`col-md-3 col-lg-2 d-md-block bg-light sidebar ${
              isMenuOpen ? "show" : "collapse"
            }`}
          >
            <div className="position-sticky pt-3 sideBar_menu">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <FaHome /> Home
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/employees"}>
                    <FaPeopleArrows /> Manage Employees
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/department"}>
                    <FaBuilding /> Manage Departments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/projects"}>
                    <FaBookOpen /> Manage Projects
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

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Hello {user}!</h1>{" "}
              <button
                className="navbar-toggler btn__toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded={isMenuOpen ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            <Container className="mt-5">
              <Row>
                <Col md={4}>
                  <Card bg="info" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Total Employees</Card.Title>
                      <Card.Text>
                        <span>{totalEmployees}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card bg="success" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Total Departments</Card.Title>
                      <Card.Text>
                        <span>{totalDepartments}</span>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card bg="warning" text="dark" className="mb-2">
                    <Card.Body>
                      <Card.Title>Upcoming Events</Card.Title>
                      <Card.Text>
                        {upcomingEvents.map((event, index) => (
                          <Badge
                            key={index}
                            pill
                            variant="dark"
                            className="mr-1"
                          >
                            {event}
                          </Badge>
                        ))}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Card bg="primary" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Employee Content</Card.Title>
                      <Card.Text>
                        <ul>
                          {employees.map((employee, index) => (
                            <li key={index}>
                              <strong>{employee.name}</strong> -{" "}
                              {employee.position} ({employee.department})
                            </li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card bg="danger" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Manager Content</Card.Title>
                      <Card.Text>
                        <ul>
                          {managers.map((manager, index) => (
                            <li key={index}>
                              <strong>{manager.name}</strong> -{" "}
                              {manager.position} <br />
                              Achievements: {manager.achievements}
                            </li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Card bg="light" className="mb-2">
                    <Card.Body>
                      <Card.Title>Recent Activities</Card.Title>
                      <Card.Text>
                        <ul>
                          {recentActivities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card bg="success" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Training and Development</Card.Title>
                      <Card.Text>
                        <ul>
                          {trainingPrograms.map((program, index) => (
                            <li key={index}>{program}</li>
                          ))}
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Card bg="info" text="white" className="mb-2">
                    <Card.Body>
                      <Card.Title>Announcements</Card.Title>
                      <Card.Text>
                        <ul>
                          {announcements.map((announcement, index) => (
                            <li key={index}>{announcement}</li>
                          ))}
                        </ul>
                      </Card.Text>
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

export default AdminDashboard;
