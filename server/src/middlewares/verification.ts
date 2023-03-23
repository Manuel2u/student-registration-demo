const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

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
    console.log(req.headers["authorization"]);
    token = req.headers.authorization?.split(" ")[1];
    const decoded: any = await jwt.verify(
      token || "",
      process.env.JWT_SECRET || "Dodoo123#"
    );
    // check expiry
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: "Token Expired" });
    }
    req.user = decoded;
    console.log(req.user.id);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized Access" });
  }
  if (!token) {
    // CreateError("No token", 403);
    throw new Error("Unauthorized Access ");
  }
};
