import express from "express";
const departmentRouter = express.Router();

import {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";
import { isAdmin, verifyToken } from "../middleware/protectRoute.js";

departmentRouter.route("/department").get(verifyToken,isAdmin,getDepartments).post(verifyToken,isAdmin,createDepartment);
departmentRouter
  .route("/department/:id")
  .delete(verifyToken,isAdmin,deleteDepartment)
  .put(verifyToken,isAdmin,updateDepartment)
  .get(verifyToken,isAdmin,getDepartment);

export default departmentRouter;
