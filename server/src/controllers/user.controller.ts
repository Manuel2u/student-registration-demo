import User from "../models/user.model";
import bcrypt from "bcryptjs";
import express, { NextFunction } from "express";
const app = express();
app.use(express.json());
import GENERATE_TOKEN from "../utils/token/token";
import { Request, Response } from "express";
import dotenv from "dotenv";
import createError from "../utils/Error";
dotenv.config();

const SIGNUP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password) {
      createError("Make sure all inputs fields are right", 400);
    }

    const alreadyExistingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (alreadyExistingUser) {
      createError("user already exists", 401);
    }

    const hash = await bcrypt.hash(password, 10);

    if (!hash) {
      createError("there was an error signing user up", 401);
    }

    const _user = new User({
      username: username,
      email: email,
      password: hash,
    });

    const user = await _user.save();

    return res.status(200).json({
      user,
    });
  } catch (err: any) {
    next(createError(err, 500));
  }
};

const SIGNIN = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email_username, password } = req.body;

    if (!email_username || !password) {
      next(createError("Make sure all Inputs are right", 400));
    }

    const user_found = await User.findOne({
      $or: [{ username: email_username }, { email: email_username }],
    });

    if (!user_found) {
      next(createError("Account not found", 404));
    } else {
      const isPasswordmatch = await bcrypt.compare(
        password,
        user_found?.password || ""
      );

      if (!isPasswordmatch) next(createError("wrong password", 400));

      const { token } = GENERATE_TOKEN(user_found);
      user_found.token = token;

      await user_found.save();

      const { _id, email, username } = user_found;

      const user = {
        _id,
        email,
        username,
        token,
      };

      return res.json({ user });
    }
  } catch (err: any) {
    next(createError(err, 400));
  }
};

// get the logged in user details
const GET_USER_DETAILS = async (req: any, res: any, next: any) => {
  try {
    const user_1: any = await User.findOne({ _id: req.user.id });
    if (!user_1) {
      next(createError("user not found", 404));
    }

    const { _id, username, email } = user_1?._doc;
    const user = {
      _id,
      username,
      email,
    };
    return res.status(200).json({ user });
  } catch (err: any) {
    next(createError(err, 401));
  }
};

export { SIGNUP, SIGNIN, GET_USER_DETAILS };
