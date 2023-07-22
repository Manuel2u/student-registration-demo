"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jwt = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const Error_1 = __importDefault(require("../utils/Error"));
dotenv_1.default.config();
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token;
    try {
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                next((0, Error_1.default)("Token expired", 401));
            }
            req.user = decoded;
        });
        next();
    }
    catch (err) {
        next((0, Error_1.default)("Invalid access token", 401));
    }
    if (!token) {
        next((0, Error_1.default)("No token", 401));
    }
});
exports.verifyAccessToken = verifyAccessToken;
