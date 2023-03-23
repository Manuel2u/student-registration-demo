import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
