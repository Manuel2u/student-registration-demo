import Student from "../models/student.model";
import { Response, Request } from "express";

//create a new student
const CREATE_STUDENT = async (req: Request, res: Response) => {
  const { studentID, programme, name, email, contact, residence } = req.body;

  if (!studentID || !name || !programme || !email || !residence || !contact) {
    res.status(500).json({
      err: "make sure all fields are correct",
    });
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
};

const GET_ALL_STUDENT = async (req: Request, res: Response) => {
  const student = await Student.find({ user: req.user.id });
  res.status(200).json(student);
};

const FIND_STUDENT = async (req: Request, res: Response) => {
  // take id from param
  const { id } = req.params;

  // find student by id
  const student = await Student.find({ _id: id });

  // if student is not found
  if (!student) {
    return res.status(404).json({
      err: "student not found",
    });
  }

  // if student is found
  res.status(200).json(student);
};

export { CREATE_STUDENT, FIND_STUDENT, GET_ALL_STUDENT };
