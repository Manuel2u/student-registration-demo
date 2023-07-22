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
const dotenv_1 = __importDefault(require("dotenv"));
const Error_1 = __importDefault(require("../utils/Error"));
dotenv_1.default.config();
const SIGNUP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!email || !username || !password) {
            (0, Error_1.default)("Make sure all inputs fields are right", 400);
        }
        const alreadyExistingUser = yield user_model_1.default.findOne({
            $or: [{ email }, { username }],
        });
        if (alreadyExistingUser) {
            (0, Error_1.default)("user already exists", 401);
        }
        const hash = yield bcryptjs_1.default.hash(password, 10);
        if (!hash) {
            (0, Error_1.default)("there was an error signing user up", 401);
        }
        const _user = new user_model_1.default({
            username: username,
            email: email,
            password: hash,
        });
        const user = yield _user.save();
        return res.status(200).json({
            user,
        });
    }
    catch (err) {
        next((0, Error_1.default)(err, 500));
    }
});
exports.SIGNUP = SIGNUP;
const SIGNIN = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_username, password } = req.body;
        if (!email_username || !password) {
            next((0, Error_1.default)("Make sure all Inputs are right", 400));
        }
        const user_found = yield user_model_1.default.findOne({
            $or: [{ username: email_username }, { email: email_username }],
        });
        if (!user_found) {
            next((0, Error_1.default)("Account not found", 404));
        }
        else {
            const isPasswordmatch = yield bcryptjs_1.default.compare(password, (user_found === null || user_found === void 0 ? void 0 : user_found.password) || "");
            if (!isPasswordmatch)
                next((0, Error_1.default)("wrong password", 400));
            const { token } = (0, token_1.default)(user_found);
            user_found.token = token;
            yield user_found.save();
            const { _id, email, username } = user_found;
            const user = {
                _id,
                email,
                username,
                token,
            };
            return res.json({ user });
        }
    }
    catch (err) {
        next((0, Error_1.default)(err, 400));
    }
});
exports.SIGNIN = SIGNIN;
// get the logged in user details
const GET_USER_DETAILS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_1 = yield user_model_1.default.findOne({ _id: req.user.id });
        if (!user_1) {
            next((0, Error_1.default)("user not found", 404));
        }
        const { _id, username, email } = user_1 === null || user_1 === void 0 ? void 0 : user_1._doc;
        const user = {
            _id,
            username,
            email,
        };
        return res.status(200).json({ user });
    }
    catch (err) {
        next((0, Error_1.default)(err, 401));
    }
});
exports.GET_USER_DETAILS = GET_USER_DETAILS;
