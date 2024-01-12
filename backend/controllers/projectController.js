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
    res.status(200).json({ message: "All Projects" });
  } catch (error) {
    console.error("Error getting projects", error);
  }
});

// Create Projects
// Post req
// Public
const createProject = asyncHandler(async (req, res) => {
  const { date, startTime, endTime, taskDescription } = req.body;

  try {
    const query =
      "INSERT INTO Timesheets(Date, StartTime, EndTime,TaskDescription) VALUES (?,?,?,?)";
    const values = [date, startTime, endTime, taskDescription];

    await pool.query(query, values);
    res.status(200).json({ message: "Project Created" });
  } catch (error) {
    console.error("Error creating Project", error);
  }
});

// Get Project by ID
// Get req
// Public
const getProject = asyncHandler(async (req, res) => {
  
  try {
    const query = "SELECT * FROM Deparments WHERE ProjectID = ?"

  } catch (error) {
    
  }
  res.status(200).json({ message: "Get Project" });
});

// Delete Project by ID
// Delete req
// Public
const deleteProject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Project Deleted" });
});

// Update Project by ID
// Put req
// Public
const updateProject = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Project Updated" });
});

export {
  getProjects,
  getProject,
  deleteProject,
  createProject,
  updateProject,
};
