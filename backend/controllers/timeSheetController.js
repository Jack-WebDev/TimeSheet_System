import asyncHandler from "express-async-handler";

// All Timesheets
// Get req
// Public
const getTimeSheets = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "All Time Sheets" });
});

// Get Timesheet by ID
// Get req
// Public
const getTimeSheet = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Time Sheet" });
});

export { getTimeSheets, getTimeSheet };
