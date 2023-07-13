const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import createError from "../utils/Error";
dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user: any;
  }
}
export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  try {
    token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      function (err: any, decoded: any) {
        if (err) {
          next(createError("Token expired", 401));
        }
        req.user = decoded;
      }
    );
    next();
  } catch (err) {
    next(createError("Invalid access token", 401));
  }

  if (!token) {
    next(createError("No token", 401));
  }
};
