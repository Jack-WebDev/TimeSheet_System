// ... (existing imports)

const ManageTimesheets = () => {
  // ... (existing state and useEffect)

  const renderTimesheetCard = (timesheet) => (
    <div className="col-md-4 mb-4">
      <Card
        key={timesheet.TimesheetID}
        className="p-3 d-flex flex-column align-items-center hero-card bg-gradient shadow"
      >
        <>
          <p className="card-text">Name: {timesheet.FullName}</p>
          <p className="card-text">Project Name: {timesheet.ProjectName}</p>
          <p className="card-text">Start Date: {formatDate(timesheet.StartTime)}</p>
          <p className="card-text">End Date: {formatDate(timesheet.EndTime)}</p>
          <p className="card-text">Hours Worked: {timesheet.HoursWorked} hours</p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="success"
              className="btn-approve"
              onClick={() => handleTimesheet(timesheet.TimesheetID, "Approved")}
            >
              Approve
            </Button>
            <Button
              variant="danger"
              className="btn-reject"
              onClick={() => handleTimesheet(timesheet.TimesheetID, "Rejected")}
            >
              Reject
            </Button>
          </div>
        </>
      </Card>
    </div>
  );

  // ... (existing formatDate function and return statement)

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* ... (existing navigation sidebar) */}

          <main className="col-md-9 col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1>Good day Manager!</h1>
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

export default ManageTimesheets;
