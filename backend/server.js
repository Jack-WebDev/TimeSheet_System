import express from "express";
import dotenv from "dotenv";
dotenv.config();
// import { notFound, handleErrors } from "./middleware/errorHandler.js";
const port = process.env.PORT || 5001;
import userRoutes from "./routes/userRoute.js";
import timeSheetRouter from "./routes/timeSheetRoute.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/timesheets", timeSheetRouter);


// app.use(notFound);
// app.use(handleErrors);
app.listen(port, () => {
  console.log(`Server running.... on port ${port}`);
});
