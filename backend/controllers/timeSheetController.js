import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

// All Timesheets
// Get req
// Public
const getTimesheets = asyncHandler(async (req, res) => {
  try {
    const query = "SELECT * FROM Timesheets ORDER BY CREATED_AT DESC";
    const [rows] = await pool.query(query);
    if (rows.length === 0) {
      return res.status(200).json({ message: "No Timesheets available" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting timesheets", error);
    res.status(500).json({ error: "Error getting timesheets" });
  }
});

// Create Timesheet
// Post req
// Public
const createTimesheet = asyncHandler(async (req, res) => {
  const { fullName, projectName, startTime, endTime, hoursWorked } = req.body;

  try {
    const query =
      "INSERT INTO Timesheets (FullName,ProjectName, StartTime,EndTime,HoursWorked) VALUES (?,?,?,?,?)";
    const values = [fullName, projectName, startTime, endTime, hoursWorked];

    await pool.query(query, values);

    res.status(201).json({ message: "Project created!" });
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
const updateTimesheet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const status = req.body.status;
  try {
    const timesheetID = parseInt(id, 10);

    const query = "UPDATE Timesheets SET Status = ? WHERE TimesheetID = ?";
    const values = [status, timesheetID];

    await pool.query(query, values);

    res.status(201).json({ message: "Timesheet Updated" });
  } catch (error) {
    console.error("Error updating timesheet", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export {
  getTimesheets,
  getTimesheet,
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
};
