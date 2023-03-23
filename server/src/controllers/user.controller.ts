import User from "../models/user.model";
import bcrypt from "bcryptjs";
import express from "express";
const app = express();
app.use(express.json());
import GENERATE_TOKEN from "../utils/token/token";
import { Request, Response } from "express";
import { signInInfo, signUpInfo } from "../types";

app.use(express.urlencoded({ extended: true }));

const signInUser = async (info: signInInfo) => {
  try {
    const { password, email_username } = info;
    const user = await User.findOne({
      $or: [{ username: email_username }, { email: email_username }],
    });

    if (!user) return new Error("wrong email or username");

    const isPasswordmatch = await bcrypt.compare(password, user.password || "");

    if (!isPasswordmatch) return new Error("wrong password");

    return user;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const signUpUser = async (info: signUpInfo) => {
  const hash = await bcrypt.hash(info.password, 10);
  if (!hash) {
    throw new Error(`there was an error signing user up`);
  }

  const user = new User({
    username: info.username,
    email: info.email,
    password: hash,
  });

  const savedUser = await user.save();
  return savedUser;
};

const SIGNUP = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const info = { email, username, password };

    if (!email || !username || !password) {
      return res.status(400).json("Make sure all inputs are valid");
    }

    const alreadyExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (alreadyExistingUser) {
      return res.status(500).json("User already exists");
    }

    const user = await signUpUser(info);
    const { access_token, refresh_token } = GENERATE_TOKEN(user);
    user.token = refresh_token;

    await user.save();

    return res.json({
      user,
      access_token,
    });
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const SIGNIN = async (req: Request, res: Response) => {
  try {
    const { email_username, password } = req.body;
    const info = { email_username, password };

    if (!email_username || !password) {
      return res.status(401).json("Make sure all inputs are right");
    }
    const user = await signInUser(info);

    return res.json({ user });
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

// get the logged in user details
const GET_USER_DETAILS = async (req: any, res: any) => {
  console.log(req.user.id);
  User.findOne({ _id: req.user.id }).then((dbuser: any) => {
    if (!dbuser) {
      return res.status(404).json({ usernotfound: "User not found" });
    } else {
      res.status(200).json({ dbuser });
    }
  });
};

export { SIGNUP, SIGNIN, GET_USER_DETAILS };
