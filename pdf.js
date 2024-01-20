const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Sample data for demonstration purposes
let timesheetData = [
  { id: 1, employeeId: 1, departmentId: 1, projectId: 1, hoursWorked: 8, date: '2024-01-18' },
  { id: 2, employeeId: 2, departmentId: 2, projectId: 2, hoursWorked: 6, date: '2024-01-18' },
];

// Endpoint to get timesheet data for an employee or a group of employees
app.post('/api/report', (req, res) => {
  const { employeeId, departmentId, projectId, startDate, endDate } = req.body;

  let filteredTimesheetData = timesheetData;

  if (employeeId) {
    filteredTimesheetData = filteredTimesheetData.filter(entry => entry.employeeId === employeeId);
  }

  if (departmentId) {
    filteredTimesheetData = filteredTimesheetData.filter(entry => entry.departmentId === departmentId);
  }

  if (projectId) {
    filteredTimesheetData = filteredTimesheetData.filter(entry => entry.projectId === projectId);
  }

  if (startDate && endDate) {
    filteredTimesheetData = filteredTimesheetData.filter(entry =>
      entry.date >= startDate && entry.date <= endDate
    );
  }

  res.json({ timesheetData: filteredTimesheetData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
