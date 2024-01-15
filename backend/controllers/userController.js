import { pool } from "../models/database.js";
import {
  doesUserExist,
  generateToken,
  hashPassword,
  comparePassword,
} from "../middleware/authHandler.js";

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
    const token = generateToken(res, user.UserID);
    return res.json({ token });
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

  const userExists = await doesUserExist(email);

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const insertQuery =
      "INSERT INTO Users (Name, Email, Password) VALUES (?,?,?)";
    const insertValues = [name, email, hashedPassword];

    const response = await pool.query(insertQuery, insertValues);

    return res.status(201).json({ response });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Log Out User
// POST req api/users/logout
// Public
const logOutUser = async (req, res) => {
  // res.cookie("jwt gone", "", {
  //   httpOnly: true,
  //   expires: new Date(0),
  // });
  res.clearCookie("jwt")
  res.status(200).json({ message: "User Logged out!" });
};

const getAllUsers = async (req, res) => {
  const query = "SELECT * FROM USERS";
  const response = await pool.query(query);

  res.status(201).json({ response });
};

// User Profile
// GET req api/users/profile
// Private
const getUserProfile = async (req, res) => {
  console.log(req.user);

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
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
