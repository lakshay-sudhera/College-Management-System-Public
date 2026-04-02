const Assignment = require("../models/Assignment");
const Test = require("../models/Test");
const Grade = require("../models/Grade");
const Attendance = require("../models/Attendance");
const Calendar = require("../models/Calendar");
const Course=require("../models/Course");

exports.submitAssignment = async (req, res) => {
  const { assignmentId, file } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);

    assignment.submissions.push({
      student: req.user.id,
      file:req.file.path,    //file submission from cloudinary
      // file:file
    });

    await assignment.save();

    res.json({ message: "Assignment submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitTest = async (req, res) => {
  const { testId, answers } = req.body;

  try {
    const test = await Test.findById(testId);

    test.submissions.push({
      student: req.user.id,   
      answers:req.file.path,
      // answers:answers,
    });
   
    await test.save();

    res.json({ message: "Test submitted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyGrades = async (req, res) => {
  // console.log(req.user);
  try {
    const grades = await Grade.find({ student: req.user.id })
      .populate("course", "name code");
    // console.log(grades);
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAssignments = async (req, res) => {
  console.log(req.user)
  const assignments = await Assignment.find({
    course: { $in: req.user.courses } // or filter logic
  });

  res.json(assignments);
};
exports.getStudentTests = async (req, res) => {
  try {
    // Find courses where student is enrolled
    const courses = await Course.find({
      students: req.user.id,
    }).select("_id");

    const courseIds = courses.map((c) => c._id);

    // Find tests for those courses
    const tests = await Test.find({
      course: { $in: courseIds },
    }).populate("course", "name code");

    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyAttendance = async (req, res) => {
  // console.log(req.user);
  try {
    const attendance = await Attendance.find({
      student: req.user.id,
    }).populate("course", "name");
    // console.log(attendance);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyProgress = async (req, res) => {
  try {

    const grades = await Grade.find({ student: req.user.id });
    const attendance = await Attendance.find({ student: req.user.id });

    //  Average assignment marks
    const assignmentList = grades.filter((a) => a.test.trim() === "")
    const avgAssignmentMarks = assignmentList.reduce((acc, g) => acc + g.marks, 0) / assignmentList.length || 0;

    //  Average Test marks
    const testList = grades.filter((a) => a.assignment.trim() === "")
    const avgTestMarks = testList.reduce((sum, g) => sum + g.marks, 0) / testList.length || 0;

    //  Attendance %
    const present = attendance.filter(
      (a) => a.status === "present"
    ).length;

    const attendancePercent =
      (present / attendance.length) * 100 || 0;

    res.json({
      averageAssignmentMarks: avgAssignmentMarks,
      averageTestMarks: avgTestMarks,
      attendancePercent,
      totalSubjects: new Set(grades.map(g => g.course.toString())).size,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get calendar
exports.getCalendar = async (req, res) => {
  try {
    const calendars = await Calendar.find();
    res.json(calendars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Important Improvements (Add Later)
// Prevent multiple submissions
// File upload (use Multer / Cloudinary)
// Deadline system for assignments/tests
// MCQ-based test system

