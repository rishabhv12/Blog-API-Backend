import express from "express";
import { getAllUser, login, signup, forgotpassword, resetpassword } from "../controllers/user-controller";
const userrouter = express.Router(); //Router is inside express predefined


userrouter.get("/", getAllUser);
userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.post('/forgotpassword', forgotpassword);
userrouter.post('/resetpassword', resetpassword);

export default userrouter;
