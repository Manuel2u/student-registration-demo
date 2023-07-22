"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const customError = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        err: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
};
exports.default = customError;
