import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Timesheets
// Get req
// Public
const getTimesheets = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM Timesheets";
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      return res.status(401).json({ message: "No Timesheets available" });
    }
    res.status(200).json({ rows });
  } catch (error) {
    console.error("Error getting timesheets", error);
  }
});

// Create Timesheet
// Post req
// Public
const createTimesheet = asyncHandler(async (req, res) => {
  const {
    fullName,
    projectName,
    startTime,
    endTime,
    hoursWorked,
    submissionDate,
  } = req.body;


  try {
    const query =
      "INSERT INTO Timesheets (FullName,ProjectName, StartTime,EndTime,HoursWorked, SubmissionDate) VALUES (?,?,?,?,?,?)";
    const values = [
      fullName,
      projectName,
      startTime,
      endTime,
      hoursWorked,
      submissionDate,
    ];

    await pool.query(query, values);

    res.status(200).json({ message: "Project created!" });
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Timesheet by ID
// Get req
// Public
const getTimesheet = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM Timesheets WHERE TimesheetID = ?";
    const value = [id];

    const response = await pool.query(query, value);

    res.status(200).json({ message: response[0][0] });
  } catch (error) {
    console.error("Error getting project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Timesheet by ID
// Delete req
// Public
const deleteTimesheet = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM Timesheets WHERE TimesheetsID = ?";
    const values = [id];

    await pool.query(query, values);

    res.status(200).json({ message: "Project deleted!" });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Timesheet by ID
// Put req
// Public
const updateTimesheet = asyncHandler(async (req, res) => {});

export {
  getTimesheets,
  getTimesheet,
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
};
