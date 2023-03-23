import { Request, Response, NextFunction } from "express";

const customError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    err: err.message,
    stack: process.env.NODE_ENV === "development" ? null : err.stack,
  });
  next(err)
};

export default customError;
