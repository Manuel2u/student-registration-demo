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
exports.GET_USER_DETAILS = exports.SIGNIN = exports.SIGNUP = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const token_1 = __importDefault(require("../utils/token/token"));
app.use(express_1.default.urlencoded({ extended: true }));
const signInUser = (info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email_username } = info;
        const user = yield user_model_1.default.findOne({
            $or: [{ username: email_username }, { email: email_username }],
        });
        if (!user)
            throw new Error("wrong email or username");
        const isPasswordmatch = yield bcryptjs_1.default.compare(password, user.password || "");
        if (!isPasswordmatch)
            throw new Error("wrong password");
        return user;
    }
    catch (error) {
        throw error;
    }
});
const signUpUser = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcryptjs_1.default.hash(info.password, 10);
    if (!hash) {
        throw new Error(`there was an error signing user up`);
    }
    const user = new user_model_1.default({
        username: info.username,
        email: info.email,
        password: hash,
    });
    const savedUser = yield user.save();
    return savedUser;
});
const SIGNUP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const info = { email, username, password };
        if (!email || !username || !password) {
            return res.status(400).json("Make sure all inputs are valid");
        }
        const alreadyExistingUser = yield user_model_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (alreadyExistingUser) {
            return res.status(500).json("User already exists");
        }
        const user = yield signUpUser(info);
        const { access_token, refresh_token } = (0, token_1.default)(user);
        user.token = refresh_token;
        yield user.save();
        return res.json({
            user,
            access_token,
        });
    }
    catch (err) {
        res.status(500).json(`${err}`);
    }
});
exports.SIGNUP = SIGNUP;
const SIGNIN = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_username, password } = req.body;
        const info = { email_username, password };
        if (!email_username || !password) {
            return res.status(401).json("Make sure all inputs are right");
        }
        const user = yield signInUser(info);
        return res.status(200).json({ user });
    }
    catch (err) {
        return res.status(401).json(err.message);
    }
});
exports.SIGNIN = SIGNIN;
// get the logged in user details
const GET_USER_DETAILS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_model_1.default.findOne({ _id: req.user.id }).then((dbuser) => {
            if (!dbuser) {
                return res.status(404).json({ usernotfound: "User not found" });
            }
            else {
                res.status(200).json({ dbuser });
            }
        });
    }
    catch (err) {
        res.status(401).json(err);
    }
});
exports.GET_USER_DETAILS = GET_USER_DETAILS;
