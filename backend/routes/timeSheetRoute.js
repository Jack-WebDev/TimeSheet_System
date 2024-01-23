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

timesheetRouter.get("/manager/timesheets", verifyToken, isManager, getTimesheets);
timesheetRouter.route("/employee/timesheet").get(getTimesheets).post(createTimesheet);
timesheetRouter
  .route("/timesheet/:id")
  .delete(deleteTimesheet)
  .put(updateTimesheet)
  .get(getTimesheet);

export default timesheetRouter;
