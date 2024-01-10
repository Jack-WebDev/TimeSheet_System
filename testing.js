import express from "express";
import mysql from "mysql2";
import bcrypt from "bcryptjs";


const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Jackwebdev@123",
    database: "NDT",
  })
  .promise();

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

app.get("/userss", async (req, res) => {
  const data = await pool.query("SELECT * FROM USERS");
  res.status(201).json({ data });
});

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await doesUserExist(email);

  if (userExists) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const data = await pool.query(
    "INSERT INTO USERS (NAME, EMAIL, PASSWORD) VALUES (?,?,?)",
    [name, email, hashedPassword]
  );

  console.log(data);
  res.status(201).json({ name, email, password });
});

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
