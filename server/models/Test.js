const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  totalMarks: Number,

  submissions: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      answers: String, // can be file/text later
      marksObtained: Number,
      evaluated: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);