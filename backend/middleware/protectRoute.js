import jwt from "jsonwebtoken";
import { pool } from "../models/database.js";

const verifyToken = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


const isAdmin = async (req, res, next) => {
  let token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await pool.query("SELECT * FROM USERS WHERE UserID = ?", [
    decoded.userID,
  ]);

  if (user[0][0].Role === "Administrator") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: Admin access required" });
};

export { verifyToken, isAdmin };
