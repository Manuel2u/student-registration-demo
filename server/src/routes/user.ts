import { verifyAccessToken } from "../middlewares/verification";

import express from "express";

const router = express.Router();

import {
  SIGNUP,
  GET_USER_DETAILS,
  SIGNIN,
} from "../controllers/user.controller";

router.post("/signup", SIGNUP);

router.post("/signin", SIGNIN);

router.get("/user", verifyAccessToken, GET_USER_DETAILS);

export default router;
