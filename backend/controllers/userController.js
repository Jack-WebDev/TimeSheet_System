import { pool } from "../models/database.js";
import jwt from "jsonwebtoken";
import validator from "validator"

import {
  doesUserExist,
  hashPassword,
  comparePassword,
} from "../middleware/authHandler.js";

// Auth User
// POST req api/users/auth
// Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  if(!validator.isEmail(email)){
    return res.status(309).json({message: "Invalid email"})
  }

  try {
    const query = "SELECT * FROM Users WHERE Email = ?";
    const [rows] = await pool.query(query, [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = rows[0];
    const isPasswordValid = await comparePassword(password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    });

    res.json({ success: true, role: user.Role, name: user.Name });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register User
// POST req api/users
// Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if(!validator.isEmail(email)){
    return res.status(309).json({message: "Invalid email"})
  }

  const userExists = await doesUserExist(email);

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  try {

    if(!validator.isStrongPassword(password)) {
      return res.status(309).json({message: "Password not strong enough"})
    }

    const hashedPassword = await hashPassword(password);

    const insertQuery =
      "INSERT INTO Users (Name, Email, Password) VALUES (?,?,?)";
    const insertValues = [name, email, hashedPassword];

    const response = await pool.query(insertQuery, insertValues);

    return res.status(201).json({ response });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Log Out User
// POST req api/users/logout
// Public
const logOutUser = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User Logged out!" });
};

const getAllUsers = async (req, res) => {
  try {
    const query = "SELECT * FROM USERS";
    const response = await pool.query(query);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM USERS WHERE UserID = ?";
    const value = [id];
    const response = await pool.query(query, value);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
};

// Update User Profile
// PUT req api/users
// Private
const updateUserProfile = async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  try {
    const userID = parseInt(id, 10);

    const updateQuery =
      "UPDATE Users SET Name = ?, Email = ?, Role = ?  WHERE UserID = ?";
    const updateValues = [name, email, role, userID];

    await pool.query(updateQuery, updateValues);

    return res.status(201).json({ message: "User Profile Updated!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "DELETE FROM Users WHERE UserID = ?";
    const values = [id];

    await pool.query(query, values);

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  authUser,
  registerUser,
  logOutUser,
  getAllUsers,
  getUser,
  updateUserProfile,
  deleteUserProfile,
};
