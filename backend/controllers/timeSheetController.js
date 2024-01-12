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
    res.status(200).json({ message: "All Timesheets" });
  } catch (error) {
    console.error("Error getting timesheets", error);
  }
});

// Create Timesheet
// Post req
// Public
const createTimesheet = asyncHandler(async (req, res) => {
  const { date, startTime, endTime, taskDescription } = req.body;

  try {
    const query =
      "INSERT INTO Timesheets(Date, StartTime, EndTime,TaskDescription) VALUES (?,?,?,?)";
    const values = [date, startTime, endTime, taskDescription];

    await pool.query(query, values);
    res.status(200).json({ message: "Timesheet Created" });
  } catch (error) {
    console.error("Error creating timesheet", error);
  }
});

// Get Timesheet by ID
// Get req
// Public
const getTimesheet = asyncHandler(async (req, res) => {
  
  try {
    const query = "SELECT * FROM Timesheet WHERE TimesheetID = ?"

  } catch (error) {
    
  }
  res.status(200).json({ message: "Get Timesheet" });
});

// Delete Timesheet by ID
// Delete req
// Public
const deleteTimesheet = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Timesheet Deleted" });
});

// Update Timesheet by ID
// Put req
// Public
const updateTimesheet = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Timesheet Updated" });
});

export {
  getTimesheets,
  getTimesheet,
  deleteTimesheet,
  createTimesheet,
  updateTimesheet,
};
