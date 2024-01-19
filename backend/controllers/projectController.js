import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Projects
// Get req
// Public
const getProjects = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM Projects";
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No Projects available" });
    }
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error getting projects", error);
  }
});


// Get projects by department
// Get req
// Private

const getProjectByDepart = asyncHandler(async (req,res) => {
  const {id} = req.params;

  try {

    const query = "SELECT * FROM Projects WHERE DepartmentID = ?"
    const value = [id]

    await pool.query(query, value)
    res.status(200).json({message: "Project by Department retrieved"})
  } catch (error) {
    console.error(error)
  }
})


// app.get('/api/projects/:departmentId', (req, res) => {
//   const departmentId = parseInt(req.params.departmentId);
//   const departmentProjects = projects.filter(project => project.department_id === departmentId);
//   res.json({ projects: departmentProjects });
// });

// Create Projects
// Post req
// Public
const createProject = asyncHandler(async (req, res) => {
  const { projectName, departmentID } = req.body;

  try {
    const query = "INSERT INTO Projects (ProjectName, DepartmentID) VALUES (?,?)";
    const value = [projectName, departmentID];

    console.log(departmentID)
    const response = await pool.query(query, value);

    res.status(201).json({ message: "Project and department link created!" });
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Project by ID
// Get req
// Public
const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM Projects WHERE ProjectID = ?";
    const value = [id];

    const response = await pool.query(query, value);

    res.status(200).json({ message: response[0][0] });
  } catch (error) {
    console.error("Error getting project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Project by ID
// Delete req
// Public
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM Projects WHERE ProjectID = ?";
    const values = [id];

    await pool.query(query, values);

    res.status(200).json({ message: "Project deleted!" });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Project by ID
// Put req
// Public
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { projectName } = req.body;

  try {
    const query = "UPDATE Projects SET ProjectName = ? WHERE ProjectID = ?";
    const values = [projectName, id];
    await pool.query(query, values);

    res.status(200).json({ message: "Project Updated" });
  } catch (error) {
    console.error("Error updating project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { getProjects, getProject,getProjectByDepart, deleteProject, createProject, updateProject };
