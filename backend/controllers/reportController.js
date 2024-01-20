
const generateReport = (req,res) => {
    const {employeeId, departmentId, projectId, startDate, endDate} = req.body;

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
}


export {generateReport}
