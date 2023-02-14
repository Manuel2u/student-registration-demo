import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  programme: {
    type: String,
    required: true,
  },
  residence: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Studnet", studentSchema);
