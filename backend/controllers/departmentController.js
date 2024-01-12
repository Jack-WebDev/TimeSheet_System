import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Departments
// Get req
// Public
const getDepartments = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All Departments" });
  // try {
  //   const query = "SELECT * FROM Departments";
  //   const [rows] = await pool.query(query);
  //   if (rows.length === 0) {
  //     return res.status(401).json({ message: "No departments available" });
  //   }
  // } catch (error) {
  //   console.error("Error getting depeartments", error);
  // }
});

// Create Departments
// Post req
// Public
const createDepartment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Department Created" });
  // const { date, startTime, endTime, taskDescription } = req.body;

  // try {
  //   const query =
  //     "INSERT INTO Timesheets(Date, StartTime, EndTime,TaskDescription) VALUES (?,?,?,?)";
  //   const values = [date, startTime, endTime, taskDescription];

  //   await pool.query(query, values);
  // } catch (error) {
  //   console.error("Error creating department", error);
  // }
});

// Get Department by ID
// Get req
// Public
const getDepartment = asyncHandler(async (req, res) => {
  
  try {
    const query = "SELECT * FROM Deparments WHERE DepartmentID = ?"

  } catch (error) {
    
  }
  res.status(200).json({ message: "Get Department" });
});

// Delete Department by ID
// Delete req
// Public
const deleteDepartment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Department Deleted" });
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
