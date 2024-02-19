import jwt from "jsonwebtoken";
import { pool } from "../models/database.js";

const saveRefreshToken = async (db, userId, refreshToken) => {
  const expiresIn = 30 * 24 * 60 * 60;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  await db.query(
    "INSERT INTO RefreshTokens (UserID, RefreshToken, expires_at) VALUES (?, ?, ?)",
    [userId, refreshToken, expiresAt]
  );

  console.log("done!");
};

const getRefreshToken = async (req, res) => {

  const token = req.cookies.refreshToken

  try {
    const query = "SELECT * FROM RefreshTokens WHERE RefreshToken = ?";
    const value = [token];

    const [data] = await pool.query(query, value);

    const user = data[0].UserID;

    const [id] = await pool.query("SELECT * FROM USERS WHERE UserID = ?", [
      user,
    ]);

    const resData = id[0];

    const newToken = jwt.sign(
      { id: resData.UserID, role: resData.Role },
      process.env.JWT_KEY,
      { expiresIn: "15s" }
    );

    res.cookie("jwt", newToken, {
      httpOnly: true,
      maxAge: 15 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({ token: newToken });
  } catch (error) {
    console.error(`Error refreshing token: ${error}`);
  }

};

export { saveRefreshToken, getRefreshToken };
