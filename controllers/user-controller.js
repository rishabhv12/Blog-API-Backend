import User from "../model/user";
import config from "../config/config";
import bcrypt from "bcryptjs"; //using bcryptjs for hashing password
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./utils/constants.js";
import randomstring from "randomstring";
import nodemailer from "nodemailer";


const sendresetmail = async (email, token, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.Useremail,
        pass: config.UserPassword,
      },
    });

    const mailOptions = {
      from: config.Useremail,
      to: email,
      subject: "to reset password",
      html:
        "<p>Hi " +
        name +
        ', click on the link and <a href="http://localhost:4000/api/user/resetpassword?token=' +
        token +
        '" >  reset your paswword </a></p>',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("mail has been sent", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUser = async (req, res, next) => {
  //getting all user from database
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to get users from database." });
  }
};

//SIGNUP

export const signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);

    await user.save(); //saving new user

    return res.status(201).json({ user, token }); ///////////
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to create user. Please try again later." });
  }
};

//LOGIN

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Failed to login. Please try again later." });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "couldnot find user by email" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  var token = jwt.sign(
    { email: existingUser.email, id: existingUser._id },
    SECRET_KEY,
    {
      expiresIn: "24h",
    }
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "incorrect password" });
  } else {
    return res
      .status(200)
      .json({ message: "login", user: existingUser, token });
  }
};

export const forgotpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const userdata = await User.findOne({ email: email });

    if (userdata) {
      const token = randomstring.generate();

      const filter = { email: email };
      const update = { token };

      await User.findOneAndUpdate(filter, update, { new: true });

      await sendresetmail(email, token, userdata.firstname);

      res.status(200).send({
        success: true,
        msg: "check your inbox and reset your password",
      });
    } else {
      res.status(200).send({ success: true, msg: "user doesn't exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

export const resetpassword = async (req, res) => {
  try {
    const token = req.query.token;

    const tokenData = await User.findOne({ token: token });
    if (tokenData) {
      const password = req.body.password;

      const newpassword = bcrypt.hashSync(password, 10);

      const user = await User.findOneAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newpassword, token: "" } },
        { new: true }
      );

      res
        .status(200)
        .send({ success: true, msg: "password updated", data: user });
    } else {
      res.status(200).send({ success: false, msg: "this link has expired" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};
