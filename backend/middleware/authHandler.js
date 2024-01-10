import jwt from "jsonwebtoken";
import { pool } from "../models/database.js";
import expressAsyncHandler from "express-async-handler";

const protectRoutes = expressAsyncHandler(async (req, res, next) => {
  let token;

  // Check if the token is present in cookies
  token = req.cookies.jwt;

  try {
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // You may want to check the user's existence and permissions in the database
    const userId = decoded.id;
    const user = await getUserFromDatabase(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // You can also check user permissions if needed

    // Attach the user to the request object for further use in routes
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not Authorized, Invalid token!" });
  }
});

// Helper function to fetch user from the database
async function getUserFromDatabase(userId) {
  const query = "SELECT * FROM users WHERE UserID = ? LIMIT 1";
  const [user] = await pool.query(query, [userId]);
  return user;
}

export { protectRoutes };
