"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verification_1 = require("../middlewares/verification");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
router.post("/signup", user_controller_1.SIGNUP);
router.post("/signin", user_controller_1.SIGNIN);
router.get("/user", verification_1.verifyAccessToken, user_controller_1.GET_USER_DETAILS);
exports.default = router;
