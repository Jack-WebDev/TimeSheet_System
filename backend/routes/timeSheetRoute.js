import express from "express";
const timesheetRouter = express.Router();

import {
  getTimesheets,
  getTimesheet,
  createTimesheet,
  deleteTimesheet,
  updateTimesheet,
} from "../controllers/timeSheetController.js";
import { verifyToken, isManager } from "../middleware/protectRoute.js";

timesheetRouter.get(
  "/manager/timesheets",
  verifyToken,
  isManager,
  getTimesheets
);
timesheetRouter.put(
  "/manager/timesheets/:id",
  verifyToken,
  isManager,
  updateTimesheet
);

timesheetRouter
  .route("/employee/timesheet")
  .get(getTimesheets)
  .post(createTimesheet);
timesheetRouter
  .route("/employee/timesheet/:id")
  .delete(deleteTimesheet)
  .get(getTimesheet);

export default timesheetRouter;
