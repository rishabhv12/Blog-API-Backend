import express from "express";
import { addQuery, getAllQuerys } from "../controllers/query-controller";

const queryrouter = express.Router();

queryrouter.get("/", getAllQuerys);
queryrouter.post("/addquery", addQuery);

export default queryrouter;
