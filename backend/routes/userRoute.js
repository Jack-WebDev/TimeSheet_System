import express from "express";
const userRouter = express.Router();

import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { protectRoutes } from "../middleware/authHandler.js";

userRouter.post("/login", authUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logOutUser);
userRouter
  .route("/profile")
  .get(protectRoutes, getUserProfile)
  .put(protectRoutes, updateUserProfile);

export default userRouter;
