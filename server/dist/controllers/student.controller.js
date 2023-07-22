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
exports.GET_ALL_STUDENT = exports.FIND_STUDENT = exports.CREATE_STUDENT = void 0;
const student_model_1 = __importDefault(require("../models/student.model"));
const Error_1 = __importDefault(require("../utils/Error"));
//create a new student
const CREATE_STUDENT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID, programme, name, email, contact, residence } = req.body;
        if (!studentID || !name || !programme || !email || !residence || !contact) {
            next((0, Error_1.default)("make sure all fields are correct", 500));
        }
        const student = new student_model_1.default({
            user: req.user.id,
            studentID,
            name,
            contact,
            programme,
            email,
            residence,
        });
        const response = yield student.save();
        res.status(201).json(response);
    }
    catch (err) {
        next((0, Error_1.default)(err, 400));
    }
});
exports.CREATE_STUDENT = CREATE_STUDENT;
const GET_ALL_STUDENT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield student_model_1.default.find({ user: req.user.id });
        res.status(200).json(student);
    }
    catch (err) {
        next((0, Error_1.default)(err, 400));
    }
});
exports.GET_ALL_STUDENT = GET_ALL_STUDENT;
const FIND_STUDENT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take id from param
        const { id } = req.params;
        // find student by id
        const student = yield student_model_1.default.find({ _id: id });
        // if student is not found
        if (!student) {
            return next((0, Error_1.default)("student not found", 404));
        }
        // if student is found
        res.status(200).json(student);
    }
    catch (err) {
        next((0, Error_1.default)(err, 400));
    }
});
exports.FIND_STUDENT = FIND_STUDENT;
