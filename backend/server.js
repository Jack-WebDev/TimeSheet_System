import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5001;
import userRoutes from "./routes/userRoute.js";
import timesheetRouter from "./routes/timesheetRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import departmentRouter from "./routes/departmentRoute.js";
import projectRouter from "./routes/projectRoute.js";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/admin",departmentRouter, projectRouter)
app.use("/api/timesheets", timesheetRouter);
// app.use("/api/departments", departmentRouter);
// app.use("/api/projects", projectRouter);
// app.use("/api/timeperiods");
// app.use("/api/reports");

app.listen(port, () => {
  console.log(`Server running.... on port ${port}`);
});
