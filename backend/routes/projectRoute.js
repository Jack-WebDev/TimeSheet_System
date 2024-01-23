import express from "express";
const projectRouter = express.Router();

import {
  getProjects,
  getProject,
  getProjectByDepart,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { verifyToken, isAdmin } from "../middleware/protectRoute.js";

projectRouter
  .route("/project")
  .get(verifyToken, isAdmin, getProjects)
  .post(verifyToken, isAdmin, createProject);
projectRouter
  .route("/project/:id")
  .delete(verifyToken, isAdmin, deleteProject)
  .put(verifyToken, isAdmin, updateProject)
  .get(verifyToken, isAdmin, getProject);

export default projectRouter;
