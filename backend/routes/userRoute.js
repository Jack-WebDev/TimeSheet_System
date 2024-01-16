import express from "express";
const userRouter = express.Router();

import {
  authUser,
  registerUser,
  logOutUser,
  getAllUsers,
  getUser,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController.js";
import { isAdmin, verifyToken } from "../middleware/protectRoute.js";

userRouter.post("/login", authUser, verifyToken);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/users", verifyToken,isAdmin,getAllUsers);
userRouter
  .route("/users/:id")
  .get(verifyToken,isAdmin, getUser)
  .put(verifyToken,isAdmin, updateUserProfile)
  .delete(verifyToken,isAdmin, deleteUserProfile);

export default userRouter;
