import { Nav } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHome,
  FaPeopleArrows,
  FaBuilding,
  FaBookOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import ProjectTable from "./ProjectTable";

const ProjectScreen = () => {
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

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Hello Admin!</h1>
            </div>

            <>
              <ProjectTable />
            </>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProjectScreen;
