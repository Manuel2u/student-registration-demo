"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GENERATE_TOKEN = (user) => {
    //   Create access token
    const access_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "Dodoo123#", {
        expiresIn: "1d", // 1 day
    });
    //   Create refresh token
    const refresh_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "Dodoo123#", {
        expiresIn: "30d", // 30 days
    });
    return { access_token, refresh_token };
};
exports.default = GENERATE_TOKEN;
