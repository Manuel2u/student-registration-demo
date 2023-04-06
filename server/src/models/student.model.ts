import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  studentID: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email : {
    type : String,
    required : true
  },
  residence: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Student", studentSchema);
