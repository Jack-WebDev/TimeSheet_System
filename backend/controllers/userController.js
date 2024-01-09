import asyncHandler from "express-async-handler";

// Auth User
// POST req api/users/auth
// Public
const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

// Register User
// POST req api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Register User" });
});

// Log Out User
// POST req api/users/logout
// Public
const logOutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Logged Out" });
});

// User Profile
// GET req api/users/profile
// Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

// Update User Profile
// PUT req api/users
// Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile Updated" });
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
