import express from "express";
const projectRouter = express.Router();

import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";
import { verifyToken, isAdmin } from "../middleware/protectRoute.js";

projectRouter
  .route("/Project")
  .get(verifyToken, isAdmin, getProjects)
  .post(verifyToken, isAdmin, createProject);
projectRouter
  .route("/Project/:id")
  .delete(verifyToken, isAdmin, deleteProject)
  .put(verifyToken, isAdmin, updateProject)
  .get(verifyToken, isAdmin, getProject);

export default projectRouter;
