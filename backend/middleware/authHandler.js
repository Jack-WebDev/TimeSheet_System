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

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

const generateToken = (res, userID) => {
  const token = jwt.sign({ userID}, process.env.JWT_KEY, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 60 * 60 * 1000,
  });
};

export { generateToken, comparePassword, doesUserExist, hashPassword };
