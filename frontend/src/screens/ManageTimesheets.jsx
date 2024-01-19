import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Card } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ManageTimesheets = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/employee/timesheet"
        );

        setTimesheets(response.data);
      } catch (error) {
        console.error("Error fetching timesheets:", error);
        toast.error("Error fetching timesheets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimesheets();
  }, []);

  const handleTimesheet = (timesheetID, status) => {
    try {
      axios.put(`http://localhost:8001/api/employee/timesheet/${timesheetID}`, {
        status,
      });
      toast.success("Timesheet status updated successfully");
    } catch (error) {
      console.errxor("Error updating timesheet status:", error);
    }
  };

  const renderTimesheetCard = (timesheet) => (
    <div>
      <Container className="d-flex justify-content-center mb-3">
        <Card
          key={timesheet.TimesheetID}
          className="p-5 d-flex flex-column align-items-center hero-card bg-light"
        >
          <>
            <p>Name: {timesheet.FullName}</p>
            <p>Project Name: {timesheet.ProjectName}</p>
            <p>Start Date: {formatDate(timesheet.StartTime)}</p>
            <p>End Date: {formatDate(timesheet.EndTime)}</p>
            <p>Hours Worked: {timesheet.HoursWorked} hours</p>

            <div className="d-flex justify-content-between align-items-center gap-5 mt-3">
              {" "}
              <Button
                variant="success"
                onClick={() =>
                  handleTimesheet(timesheet.TimesheetID, "Approved")
                }
              >
                Approve
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  handleTimesheet(timesheet.TimesheetID, "Rejected")
                }
              >
                Reject
              </Button>
            </div>
          </>
        </Card>
      </Container>
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
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow py-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>NDT Timesheet System</Navbar.Brand>
          </LinkContainer>{" "}
          <button
            className="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-nav">
            <div className="nav-item text-nowrap">
              <LinkContainer to="/">
                <Nav.Link>
                  <FaSignOutAlt /> Sign Out
                </Nav.Link>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to={"/manager"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/manageTimesheets"}>
                    Manage Timesheets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/#"}>
                    Generate Reports
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="col-md-9 col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Goodday Manager!</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
            {loading && <p>Loading timesheets...</p>}

            <div className="timesheet">
              <h2 className="h2">Employee Timesheets</h2>
              {timesheets.length === 0 ? (
                <p className="p">No timesheets available.</p>
              ) : (
                timesheets.map(renderTimesheetCard)
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ManageTimesheets;
