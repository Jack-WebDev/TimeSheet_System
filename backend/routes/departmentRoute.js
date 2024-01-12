import express from "express";
const departmentRouter = express.Router();

import {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";

departmentRouter.route("/").get(getDepartments).post(createDepartment);
departmentRouter
  .route("/:id")
  .delete(deleteDepartment)
  .put(updateDepartment)
  .get(getDepartment);

export default departmentRouter;
