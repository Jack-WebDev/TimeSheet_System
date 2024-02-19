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
import { getRefreshToken } from "../controllers/refreshTokenController.js";

userRouter.post("/login", authUser, verifyToken);
userRouter.post("/register", registerUser);
userRouter.post("/logout", logOutUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/token", getRefreshToken)
userRouter
  .route("/users/:id")
  .get(verifyToken, isAdmin, getUser)
  .put(verifyToken, isAdmin, updateUserProfile)
  .delete(verifyToken, isAdmin, deleteUserProfile);

export default userRouter;
