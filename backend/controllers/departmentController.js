import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Departments
// Get req
// Public
const getDepartments = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM Departments";
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No departments available" });
    }
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error getting depeartments", error);
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

    const response = await pool.query(query, values);

    console.log(response);

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
  try {
    const query = "SELECT * FROM Deparments WHERE DepartmentID = ?";
  } catch (error) {}
  res.status(200).json({ message: "Get Department" });
});

// Delete Department by ID
// Delete req
// Public
const deleteDepartment = asyncHandler(async (req, res) => {
  const {departmentID} = req.params.id; // Assuming you pass the department ID as a URL parameter

  // console.log(departmentID)
  try {
    const query = "DELETE FROM Departments WHERE DepartmentID = ?";
    const values = [departmentID];
    // console.log(values[0])

    const result = await pool.query(query, values);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Department deleted successfully." });
    } else {
      res.status(404).json({ error: "Department not found." });
    }
  } catch (error) {
    console.error("Error deleting department", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Department by ID
// Put req
// Public
const updateDepartment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Department Updated" });
});

export {
  getDepartments,
  getDepartment,
  deleteDepartment,
  createDepartment,
  updateDepartment,
};
