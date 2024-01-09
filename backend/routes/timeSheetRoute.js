import express from "express";
const timeSheetRouter = express.Router();

import {
  getTimeSheets,
  getTimeSheet,
} from "../controllers/timeSheetController.js";

timeSheetRouter.get("/", getTimeSheets);
timeSheetRouter.get("/timeSheet{id}", getTimeSheet);

export default timeSheetRouter;
