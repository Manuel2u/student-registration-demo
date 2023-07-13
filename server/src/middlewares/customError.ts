import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config()

const customError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    err: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null
  });
};

export default customError;
