import { Navbar, Nav, Container, Card } from "react-bootstrap";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import TimesheetForm from "../screens/TimesheetForm";
import { toast } from "react-toastify";
import TimesheeetCalendar from "../components/TimesheetCalendar";

const EmployeeDashboard = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/timesheet/employee/timesheet"
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

  const handleDeleteTimesheet = async (timesheetID) => {
    try {
      await axios.delete(
        `http://localhost:8001/api/timesheet/employee/timesheet/${timesheetID}`
      );
      setTimesheets((prevTimesheets) =>
        prevTimesheets.filter(
          (timesheet) => timesheet.TimesheetID !== timesheetID
        )
      );
    } catch (error) {
      console.error("Error deleting timesheet:", error);
      toast.error("Error deleting timesheet. Please try again.");
    }
  };

  const renderTimesheetCard = (timesheet) => (
    <div key={timesheet.TimesheetID}>
      <Container className="d-flex justify-content-center mb-3">
        <Card className="card d-flex flex-column align-items-start">
          <button
            className="btn btn-danger mt-3 align-self-end"
            onClick={() => handleDeleteTimesheet(timesheet.TimesheetID)}
          >
            <FaTrash />
          </button>
          <p className="fs-4">
            <b>Full Name:</b> {timesheet.FullName}
          </p>
          <p className="fs-4">
            <b>Project Name:</b> {timesheet.ProjectName}
          </p>
          <p className="fs-4">
            <b>Start Date:</b> {formatDate(timesheet.StartTime)}
          </p>
          <p className="fs-4">
            <b>End Date:</b> {formatDate(timesheet.EndTime)}
          </p>
          <p className="fs-4">
            <b>Hours Worked:</b> {timesheet.HoursWorked} hours
          </p>
          {timesheet.Status === "Pending" && (
            <p className="fs-4">
              <b>Timesheet Status:</b>{" "}
              <span className="text-warning">{timesheet.Status}</span>
            </p>
          )}

          {timesheet.Status === "Approved" && (
            <p className="fs-4">
              <b>Timesheet Status:</b>{" "}
              <span className="text-success">{timesheet.Status}</span>
            </p>
          )}

          {timesheet.Status === "Rejected" && (
            <p className="fs-4">
              <b>Timesheet Status:</b>{" "}
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
      <header
        className="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow py-3"
        style={{ backgroundColor: "rgb(31, 41, 57)" }}
      >
        <Container>
          <LinkContainer to="/employee">
            <Navbar.Brand style={{ fontSize: "1.5rem", fontWeight: 600 }}>
              NDT Timesheet System
            </Navbar.Brand>
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
              <h1 className="text-center">
                Welcome to the Employee Timesheet Dashboard!
              </h1>
            </div>

            <TimesheetForm />
            <TimesheeetCalendar />

            {loading && <p>Loading timesheets...</p>}

            <h2 className="text-center mb-5 mt-5">Your Timesheets</h2>
            <div className="timesheets">
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
