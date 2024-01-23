import express from "express";
const reportRouter = express.Router();

import { generateReport } from "../controllers/reportController.js";

reportRouter.get("/report", generateReport);

export default reportRouter;
