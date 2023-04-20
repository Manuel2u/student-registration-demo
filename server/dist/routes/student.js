"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//import controllers
const student_controller_1 = require("../controllers/student.controller");
const verification_1 = require("../middlewares/verification");
router.get("/find-student/:id", verification_1.verifyAccessToken, student_controller_1.FIND_STUDENT);
router.post("/create-student", verification_1.verifyAccessToken, student_controller_1.CREATE_STUDENT);
router.get("/all-students", verification_1.verifyAccessToken, student_controller_1.GET_ALL_STUDENT);
exports.default = router;
