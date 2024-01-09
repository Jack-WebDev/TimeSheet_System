import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, handleErrors } from "./middleware/errorHandler.js";
const port = process.env.PORT || 5001;
import userRoutes from "./routes/userRoute.js";
const app = express();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("It's working");
});

// app.use(notFound);
// app.use(handleErrors);
app.listen(port, () => {
  console.log(`Server running.... on port ${port}`);
});
