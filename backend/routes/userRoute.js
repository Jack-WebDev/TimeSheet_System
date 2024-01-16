import express from "express";
const userRouter = express.Router();

import {
  authUser,
  registerUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  getUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";
import { isAdmin, isManager, verifyToken } from "../middleware/protectRoute.js";

userRouter.post("/login", authUser, verifyToken);
userRouter.post("/admin/login", authUser, verifyToken, isAdmin);
userRouter.post("/manager/login", authUser, verifyToken, isManager);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/users/:id", getUser);
userRouter
  .route("/users/:id")
  .get(isAdmin, getUser)
  .put(isAdmin, updateUserProfile)
  .delete(isAdmin, deleteUserProfile);

export default userRouter;
