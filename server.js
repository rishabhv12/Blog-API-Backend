import express from "express";
import mongoose from "mongoose";
import userrouter from "./routes/user-routes";
import blogrouter from "./routes/blog-routes";
import queryrouter from "./routes/query-routes";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express(); //app will use express fucntionality

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/user", userrouter);
app.use("/api/blog", blogrouter);
app.use("/api/query", queryrouter);
mongoose.set("strictQuery", true);

mongoose
  .connect(
    process.env.DATABASE
  )

  .then(() => app.listen(4000))
  .then(() => console.log("connected to database port 4000 "))
  .catch((err) => console.log(err));
