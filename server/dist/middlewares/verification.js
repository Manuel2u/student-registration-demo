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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jwt = require("jsonwebtoken");
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token;
    try {
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const decoded = yield jwt.verify(token || "", process.env.JWT_SECRET || "Dodoo123#");
        // check expiry
        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token Expired" });
        }
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json(err);
    }
    if (!token) {
        // CreateError("No token", 403);
        throw new Error("Unauthorized Access ");
    }
});
exports.verifyAccessToken = verifyAccessToken;
