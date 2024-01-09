import mysql from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Jackwebdev@123",
  database: "jack",
}).promise();

const result = await pool.query("SELECT * FROM test1");

console.log(result);
