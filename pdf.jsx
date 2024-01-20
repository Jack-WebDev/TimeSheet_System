import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    employeeId: null,
    departmentId: null,
    projectId: null,
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Fetch employees, departments, and projects from the server
    axios.get('/api/employees')
      .then(response => {
        setEmployees(response.data.employees);
      })
      .catch(error => {
        console.error('Error fetching employees', error);
      });

    axios.get('/api/departments')
      .then(response => {
        setDepartments(response.data.departments);
      })
      .catch(error => {
        console.error('Error fetching departments', error);
      });

    axios.get('/api/projects')
      .then(response => {
        setProjects(response.data.projects);
      })
      .catch(error => {
        console.error('Error fetching projects', error);
      });
  }, []);

  const generateReport = () => {
    axios.post('/api/report', filters)
      .then(response => {
        setReportData(response.data.timesheetData);
      })
      .catch(error => {
        console.error('Error generating report', error);
      });
  };

  return (
    <div>
      <h1>Reporting</h1>
      <label>Select Employee:</label>
      <select onChange={(e) => setFilters({ ...filters, employeeId: parseInt(e.target.value) })}>
        <option value="">-- All Employees --</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <label>Select Department:</label>
      <select onChange={(e) => setFilters({ ...filters, departmentId: parseInt(e.target.value) })}>
        <option value="">-- All Departments --</option>
        {departments.map((department) => (
          <option key={department.id} value={department.id}>
            {department.name}
          </option>
        ))}
      </select>

      <label>Select Project:</label>
      <select onChange={(e) => setFilters({ ...filters, projectId: parseInt(e.target.value) })}>
        <option value="">-- All Projects --</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <label>Start Date:</label>
      <input type="date" onChange={(e) => setFilters({ ...filters, startDate: e.target.value })} />

      <label>End Date:</label>
      <input type="date" onChange={(e) => setFilters({ ...filters, endDate: e.target.value })} />

      <button onClick={generateReport}>Generate Report</button>

      <h2>Report Data</h2>
      <ul>
        {reportData.map((entry) => (
          <li key={entry.id}>{`Employee ${entry.employeeId} - Department ${entry.departmentId} - Project ${entry.projectId} - Hours Worked: ${entry.hoursWorked} - Date: ${entry.date}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
