import express from "express";
import { getAllBlogs, addblog, updateblog } from "../controllers/blog-controller";

const blogrouter = express.Router();

blogrouter.get("/", getAllBlogs);
blogrouter.post("/addblog", addblog);
blogrouter.put("/updateblog/:id", updateblog);

export default blogrouter;
