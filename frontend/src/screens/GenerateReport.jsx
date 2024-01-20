import { useState, useEffect } from "react";
import axios from "axios";

const GenerateReport = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [filters, setFilters] = useState({
    employeeId: null,
    departmentId: null,
    projectId: null,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/auth/users")
      .then((response) => {
        setEmployees(response.data.response[0]);
      })
      .catch((error) => {
        console.error("Error fetching employees", error);
      });

    axios
      .get("http://localhost:8001/api/admin/department")
      .then((response) => {
        setDepartments(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching departments", error);
      });

    axios
      .get("http://localhost:8001/api/admin/project")
      .then((response) => {
        setProjects(response.data.rows);
      })
      .catch((error) => {
        console.error("Error fetching projects", error);
      });
  }, []);

  const generateReport = () => {
    axios
      .post("/api/report", filters)
      .then((response) => {
        setReportData(response.data.timesheetData);
      })
      .catch((error) => {
        console.error("Error generating report", error);
      });
  };

  return (
    <div>
      <h1>Reporting</h1>
      <label>Select Employee:</label>
      <select
        onChange={(e) =>
          setFilters({ ...filters, employeeId: parseInt(e.target.value) })
        }
      >
        <option value="">-- All Employees --</option>
        {employees.map((employee) => (
          <option key={employee.UserID} value={employee.UserID}>
            {employee.Name}
          </option>
        ))}
      </select>

      <label>Select Department:</label>
      <select
        onChange={(e) =>
          setFilters({ ...filters, departmentId: parseInt(e.target.value) })
        }
      >
        <option value="">-- All Departments --</option>
        {departments.map((department) => (
          <option key={department.DepartmentID} value={department.DepartmentID}>
            {department.DepartmentName}
          </option>
        ))}
      </select>

      <label>Select Project:</label>
      <select
        onChange={(e) =>
          setFilters({ ...filters, projectId: parseInt(e.target.value) })
        }
      >
        <option value="">-- All Projects --</option>
        {projects.map((project) => (
          <option key={project.ProjectID} value={project.ProjectID}>
            {project.ProjectName}
          </option>
        ))}
      </select>

      <label>Start Date:</label>
      <input
        type="date"
        onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
      />

      <label>End Date:</label>
      <input
        type="date"
        onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
      />

      <button onClick={generateReport}>Generate Report</button>

      <h2>Report Data</h2>
      <ul>
        {reportData.map((entry) => (
          <li
            key={entry.id}
          >{`Employee ${entry.employeeId} - Department ${entry.departmentId} - Project ${entry.projectId} - Hours Worked: ${entry.hoursWorked} - Date: ${entry.date}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenerateReport;
