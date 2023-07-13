import Student from "../models/student.model";
import { Response, Request, NextFunction } from "express";
import createError from "../utils/Error";

//create a new student
const CREATE_STUDENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentID, programme, name, email, contact, residence } = req.body;

    if (!studentID || !name || !programme || !email || !residence || !contact) {
      next(createError("make sure all fields are correct", 500));
    }

    const student = new Student({
      user: req.user.id,

      studentID,
      name,
      contact,
      programme,
      email,
      residence,
    });

    const response = await student.save();

    res.status(201).json(response);
  } catch (err: any) {
    next(createError(err, 400));
  }
};

const GET_ALL_STUDENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await Student.find({ user: req.user.id });
    res.status(200).json(student);
  } catch (err: any) {
    next(createError(err, 400));
  }
};

const FIND_STUDENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // take id from param
    const { id } = req.params;

    // find student by id
    const student = await Student.find({ _id: id });

    // if student is not found
    if (!student) {
      return next(createError("student not found", 404));
    }

    // if student is found
    res.status(200).json(student);
  } catch (err: any) {
    next(createError(err, 400));
  }
};

export { CREATE_STUDENT, FIND_STUDENT, GET_ALL_STUDENT };
