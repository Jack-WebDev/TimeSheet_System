import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

const generateReport = asyncHandler(async (req, res) => {
  const { userId, departmentId, projectId, startDate, endDate } = req.body;
  try {
    const query =
      "SELECT * FROM Users, Departments, Projects WHERE UserID = ? AND DepartmentID = ? AND ProjectID = ? AND StartTime = ? AND EndTime = ?";

    const values = [userId, departmentId, projectId, startDate, endDate];
    const data = await pool.query(query, values);

    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to generate report" });
  }
});

export { generateReport };
