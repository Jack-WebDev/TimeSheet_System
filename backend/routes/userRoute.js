import express from "express";
const userRouter = express.Router();

import {
  authUser,
  registerUser,
  logOutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAdmin, isManager, verifyToken } from "../middleware/protectRoute.js";

userRouter.post("/login", authUser, verifyToken);
userRouter.post("/admin/login", authUser, verifyToken, isAdmin);
userRouter.post("/manager/login",authUser, verifyToken, isManager);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logOutUser);
userRouter.route("/profile").get(verifyToken,getUserProfile).put(verifyToken,updateUserProfile);
userRouter.get("/users", getAllUsers);

export default userRouter;
