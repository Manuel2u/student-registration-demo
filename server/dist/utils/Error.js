"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
const createError = (message, statusCode) => {
    return new CustomError(message, statusCode);
};
exports.default = createError;
