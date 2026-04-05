const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
{
    title:{
        type: String
    } ,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    // professor:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // },
    submissions: [
      {
        student: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        file: {
            type:String,
        },
        grade: {
            type:Number,
        }
      },
    ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);