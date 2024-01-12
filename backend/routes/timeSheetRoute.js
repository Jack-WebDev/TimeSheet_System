import express from "express";
const timesheetRouter = express.Router();

import {
  getTimesheets,
  getTimesheet,
  createTimesheet,
  deleteTimesheet,
  updateTimesheet,
} from "../controllers/timeSheetController.js";

timesheetRouter.route("/timesheet").get(getTimesheets).post(createTimesheet);
timesheetRouter
  .route("/timesheet/:id")
  .delete(deleteTimesheet)
  .put(updateTimesheet)
  .get(getTimesheet);

export default timesheetRouter;
