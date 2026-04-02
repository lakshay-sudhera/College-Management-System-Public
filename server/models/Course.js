const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
    name: {
        type:String,
    },
    code: {
        type: String,
    },
    professor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    students: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },
    ],
});

module.exports = mongoose.model("Course", courseSchema);