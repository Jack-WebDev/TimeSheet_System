import jwt from "jsonwebtoken";
import { pool } from "../models/database.js";
import expressAsyncHandler from "express-async-handler";

const protectRoutes = expressAsyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await pool.query("SELECT * FROM USERS WHERE UserID = ?", [
      decoded.userId,
    ]);
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized, Invalid token!" });
  }
  if (token) {
  } else {
    res.status(401).json({ message: "Not Authorized, No token!" });
  }
});

export { protectRoutes };
