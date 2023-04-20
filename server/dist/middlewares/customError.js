"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode).json({
        err: err.message,
        stack: process.env.NODE_ENV === "development" ? null : err.stack,
    });
};
exports.default = customError;
