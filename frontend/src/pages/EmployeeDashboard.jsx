import { Navbar, Nav, Container, Card } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import TimesheetForm from "../screens/TimesheetForm";
import { toast } from "react-toastify";

const EmployeeDashboard = () => {
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

  const renderTimesheetCard = (timesheet) => (
    <div key={timesheet.TimesheetID}>
      <Container className="d-flex justify-content-center mb-3">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
          <p className="fs-4">Full Name: {timesheet.FullName}</p>
          <p className="fs-4">Project Name: {timesheet.ProjectName}</p>
          <p className="fs-4">Start Date: {formatDate(timesheet.StartTime)}</p>
          <p className="fs-4">End Date: {formatDate(timesheet.EndTime)}</p>
          <p className="fs-4">Hours Worked: {timesheet.HoursWorked} hours</p>
          {timesheet.Status === "Pending" && (
            <p className="fs-4">
              Timesheet Status:{" "}
              <span className="text-warning">{timesheet.Status}</span>
            </p>
          )}

          {timesheet.Status === "Approved" && (
            <p className="fs-4">
              Timesheet Status:{" "}
              <span className="text-success">{timesheet.Status}</span>
            </p>
          )}

          {timesheet.Status === "Rejected" && (
            <p className="fs-4">
              Timesheet Status:{" "}
              <span className="text-danger">{timesheet.Status}</span>
            </p>
          )}
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
              <LinkContainer to="/logout">
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
          <main className="col-md-9 col-lg-10 px-md-4">
            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <h1 className="h2">
                Welcome to the Employee Timesheet Dashboard!
              </h1>
            </div>

            <TimesheetForm />

            {loading && <p>Loading timesheets...</p>}

            <div className="timesheet">
              <h2 className="h2">Your Timesheets</h2>
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

export default EmployeeDashboard;
