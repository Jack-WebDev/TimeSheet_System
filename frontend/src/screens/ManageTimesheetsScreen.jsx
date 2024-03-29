import { useState, useEffect } from "react";
import { Nav, Button, Card } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaHome,
  FaFilePdf,
  FaFolderOpen,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import { useAuthContext } from "../hooks/useAuthContext";

const ManageTimesheetsScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const axios = useAxios();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { user } = useAuthContext();

  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState({});
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        setRandomUser(data.results[0]);
      } catch (error) {
        console.error("Error fetching random user:", error);
      }
    };

    fetchRandomUser();
  }, []);

  const toggleDetails = (timesheetID) => {
    setShowDetails((prevDetails) => ({
      ...prevDetails,
      [timesheetID]: !prevDetails[timesheetID],
    }));
  };

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/timesheet/manager/timesheets"
        );

        setTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
        toast.error("Forbidden: Manager access required!");
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, [axios]);

  const handleTimesheet = (timesheetID, status) => {
    try {
      axios.put(
        `http://localhost:8001/api/timesheet/manager/timesheets/${timesheetID}`,
        {
          status,
        }
      );
      toast.success("Timesheet status updated successfully");
    } catch (error) {
      console.error("Error updating timesheet status:", error);
    }
  };

  const renderTimesheetCard = (timesheet) => (
    <div className="col-md-4 mb-4" key={timesheet.TimesheetID}>
      <Card className="p-3 d-flex flex-column align-items-center hero-card bg-gradient shadow">
        <div className="d-flex align-items-center avatar_container">
          {randomUser && (
            <img
              src={randomUser.picture.thumbnail}
              alt="Avatar"
              className="avatar"
            />
          )}
          <div className="ml-3">
            <p className="card-text">
              Name: <b>{timesheet.FullName}</b>
            </p>
          </div>
        </div>

        {showDetails[timesheet.TimesheetID] && (
          <>
            <p className="card-text mt-3">
              Project Name: {timesheet.ProjectName}
            </p>
            <p className="card-text">
              Start Date: {formatDate(timesheet.StartTime)}
            </p>
            <p className="card-text">
              End Date: {formatDate(timesheet.EndTime)}
            </p>
            <p className="card-text">
              Hours Worked: {timesheet.HoursWorked} hours
            </p>

            <div className="d-flex justify-content-between gap-5 align-items-center mt-3">
              <Button
                variant="success"
                className="btn-approve"
                onClick={() =>
                  handleTimesheet(timesheet.TimesheetID, "Approved")
                }
              >
                Approve
              </Button>
              <Button
                variant="danger"
                className="btn-reject"
                onClick={() =>
                  handleTimesheet(timesheet.TimesheetID, "Rejected")
                }
              >
                Reject
              </Button>
            </div>
          </>
        )}

        <Button
          variant="primary"
          className="btn-view"
          onClick={() => toggleDetails(timesheet.TimesheetID)}
        >
          {showDetails[timesheet.TimesheetID] ? "Hide Details" : "View Details"}
        </Button>
      </Card>
    </div>
  );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
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
            {loading && <p>Loading timesheets...</p>}

            <div className="timesheet">
              <h2 className="text-center mb-5 mt-5">Employee Timesheets</h2>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {timesheets.length === 0 ? (
                  <p className="p">No timesheets available.</p>
                ) : (
                  timesheets.map(renderTimesheetCard)
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ManageTimesheetsScreen;
