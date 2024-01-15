<div key={timesheet.TimesheetID}>
      <Container className="d-flex justify-content-center mb-3">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light">
          {!isExpanded ? (
            <>
              <p>Name: {timesheet.FullName}</p>
              <p>Project Name: {timesheet.ProjectName}</p>
            </>
          ) : null}

          <Button variant="primary" onClick={handleToggle}>
            {isExpanded ? "Hide" : "View"}
          </Button>

          {isExpanded && (
            <div className="mt-3">
              <p className="fs-4">Full Name: {timesheet.FullName}</p>
              <p className="fs-4">Project Name: {timesheet.ProjectName}</p>
              <p className="fs-4">
                Start Date: {formatDate(timesheet.StartTime)}
              </p>
              <p className="fs-4">End Date: {formatDate(timesheet.EndTime)}</p>
              <p className="fs-4">
                Hours Worked: {timesheet.HoursWorked} hours
              </p>

              {/* Approve and Reject Buttons */}
              <div className="d-flex justify-content-between mt-3">
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
            </div>
          )}
        </Card>
      </Container>