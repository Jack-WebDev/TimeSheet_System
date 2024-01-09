import express from "express";
const userRouter = express.Router();

import {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

userRouter.post("/auth", authUser);
userRouter.post("/", registerUser);
userRouter.post("/logout", logOutUser);
userRouter.route("/profile").get(getUserProfile).put(updateUserProfile);

export default userRouter;
