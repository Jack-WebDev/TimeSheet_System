import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";

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
  const { name, email, password } = req.body;
  // Validate if user exists
  const doesUserExist = async (email) => {
    const query = "SELECT * FROM Users WHERE Email = ?";
    const values = [email];

    try {
      const [rows] = await pool.query(query, values);

      return rows.length > 0; // If there are rows, the user already exists
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  };

  const userExists = await doesUserExist(email);

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  const query = "INSERT INTO USER (name, email, password)";
  const values = [name, email, password];

  res.status(200).json({ message: "User has been registered!" });
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
