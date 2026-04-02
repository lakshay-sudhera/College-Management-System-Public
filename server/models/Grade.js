const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  assignment: String,
  test:String,
  marks: Number,
});

module.exports = mongoose.model("Grade", gradeSchema);