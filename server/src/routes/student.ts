import express from "express";

const router = express.Router();

//import controllers
import {
  FIND_STUDENT,
  CREATE_STUDENT,
  GET_ALL_STUDENT
} from "../controllers/student.controller";
import { verifyAccessToken } from "../middlewares/verification";

router.get("/find-student/:id", verifyAccessToken, FIND_STUDENT);

router.post("/create-student", verifyAccessToken, CREATE_STUDENT);

router.get("/all-students", verifyAccessToken, GET_ALL_STUDENT);

export default router;
