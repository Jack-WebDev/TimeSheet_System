import { Nav, Container } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHome,
  FaBookOpen,
  FaBuilding,
  FaPeopleArrows,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import UserTable from "../components/UserTable";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";


const EmployeesScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const {user} = useAuthContext()

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
                  <Link className="nav-link" to={"/admin"}>
                    <FaHome /> Home
                  </Link>
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

          <main className="col-md-9 col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Hello {user}!</h1>

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

            <Container>
              <UserTable />
            </Container>
          </main>
        </div>
      </div>
    </>
  );
};

export default EmployeesScreen;
