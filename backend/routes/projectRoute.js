import express from "express";
const projectRouter = express.Router();

import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";

projectRouter.route("/Project").get(getProjects).post(createProject);
projectRouter
  .route("/Project/:id")
  .delete(deleteProject)
  .put(updateProject)
  .get(getProject);

export default projectRouter;
