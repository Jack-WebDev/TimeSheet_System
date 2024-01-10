// import asyncHandler from "express-async-handler";
import { pool } from "../models/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const doesUserExist = async (email) => {
  const query = "SELECT * FROM Users WHERE Email = ?";
  const values = [email];

  try {
    const [rows] = await pool.query(query, values);

    return rows.length > 0;
  } catch (error) {
    console.error(`Error checking user existence: ${error}`);
    throw error;
  }
};

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error}`);
    throw error;
  }
};

const secretKey = "james123"; // Change this to a secure random key for production

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

const generateToken = (userID) => {
  return jwt.sign({ userID }, secretKey, { expiresIn: "1h" }); // Adjust the expiration as needed
};

// Auth User
// POST req api/users/auth
// Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

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

    const token = generateToken(user.UserID);

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Register User
// POST req api/users
// Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await doesUserExist(email);

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const insertQuery =
      "INSERT INTO Users (Name, Email, Password) VALUES (?,?,?)";
    const insertValues = [name, email, hashedPassword];

    await pool.query(insertQuery, insertValues);

    return res.status(201).json({ message: "User has been registered!" });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Log Out User
// POST req api/users/logout
// Public
const logOutUser = async (req, res) => {
  res.status(200).json({ message: "User Logged Out" });
};

// User Profile
// GET req api/users/profile
// Private
const getUserProfile = async (req, res) => {
  res.status(200).json({ message: "User Profile" });
};

// Update User Profile
// PUT req api/users
// Private
const updateUserProfile = async (req, res) => {
  const { userID, newName, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    const updateQuery =
      "UPDATE Users SET Name = ?, Password = ?  WHERE UserID = ?";
    const updateValues = [newName, hashedPassword, userID];

    await pool.query(updateQuery, updateValues);

    return res.json({ message: "User Profile Updated!" });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
