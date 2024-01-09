import express from "express";
import dotenv from "dotenv";
dotenv.config();
// import { notFound, handleErrors } from "./middleware/errorHandler.js";
import mysql from "mysql2";
const port = process.env.PORT || 5001;
import userRoutes from "./routes/userRoute.js";
import timeSheetRouter from "./routes/timeSheetRoute.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/timesheets", timeSheetRouter);

// const db = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "Jackwebdev@123",
//   database: "jack",
// });

// app.get("/users", (req, res) => {
//   const sql = "SELECT * FROM test1";

//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.use(notFound);
// app.use(handleErrors);
app.listen(port, () => {
  console.log(`Server running.... on port ${port}`);
});
