import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Departments
// Get req
// Public
const getDepartments = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT departments.DepartmentID, departments.DepartmentName, COUNT(projects.ProjectID) AS projectCount FROM departments LEFT JOIN projects ON departments.DepartmentID = projects.DepartmentID GROUP BY departments.DepartmentID, departments.DepartmentName";
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No departments available" });
    }
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error getting departments", error);
  }
});




// Create Departments
// Post req
// Public
const createDepartment = asyncHandler(async (req, res) => {
  const { departmentName } = req.body;

  try {
    const query = "INSERT INTO Departments (DepartmentName) VALUES (?)";
    const values = [departmentName];

    await pool.query(query, values);

    res.status(200).json({ message: "Department created!" });
  } catch (error) {
    console.error("Error creating department", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Department by ID
// Get req
// Public
const getDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM Departments WHERE DepartmentID = ?";
    const value = [id];

    const response = await pool.query(query, value);

    res.status(200).json({ message: response[0][0] });
  } catch (error) {
    console.error("Error getting department", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Department by ID
// Delete req
// Public
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM Departments WHERE DepartmentID = ?";
    const values = [id];

    await pool.query(query, values);

    res.status(200).json({ message: "Department deleted!" });
  } catch (error) {
    console.error("Error deleting department", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Department by ID
// Put req
// Public
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { departmentName } = req.body;

  try {
    const query =
      "UPDATE Departments SET DepartmentName = ? WHERE DepartmentID = ?";
    const values = [departmentName, id];
    await pool.query(query, values);

    res.status(200).json({ message: "Department Updated" });
  } catch (error) {
    console.error("Error updating department", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  getDepartments,
  getDepartment,
  deleteDepartment,
  createDepartment,
  updateDepartment,
};
