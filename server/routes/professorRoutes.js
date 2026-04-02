const express = require("express");
const router = express.Router();
const Course=require("../models/Course")
const Test=require("../models/Test")
const Assignment = require("../models/Assignment");

const {
  getMyCourses,
  createAssignment,
  markAttendance,
  addGrade,
  addTestGrade,
  evaluateTest,
  createTest,
  getAdvancedAnalytics,
  getStudentPerformance,
  getCalendar,
  getTestSubmissions,
  evaluateAssignment,
  getAssignmentSubmissions,
  getTestsByCourse,
  getAssignmentsByCourse,
  getStudentsByCourse,
  markAttendanceBulk
} = require("../controllers/professorController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

//  Only professor allowed
router.use(protect, authorizeRoles("professor"));
router.get("/dashboard", protect, async (req, res) => {
  const courses = await Course.countDocuments({ professor: req.user.id });
  const tests = await Test.countDocuments({ professor: req.user.id });
  const assignments=await Assignment.countDocuments({ professor: req.user.id });
  // optional: count students via enrollments
  const students = 0;

  res.json({ courses, assignments, tests });
});
router.get("/courses", getMyCourses);
router.post("/assignments", createAssignment);
router.get("/assignments/:courseId", getAssignmentsByCourse);
router.post("/assignments/grades", addGrade);
router.post("/attendance", markAttendance);
router.post("/attendance/bulk", markAttendanceBulk);
router.post("/tests", createTest);
router.get("/tests/:courseId", getTestsByCourse);
router.get("/tests/:testId/:courseId/submissions", getTestSubmissions);
router.post("/tests/evaluate", evaluateTest);
router.post("/tests/grades", addTestGrade);
router.get("/analytics/advanced/:courseId", getAdvancedAnalytics);
router.get("/analytics/student/:studentId/:courseId", getStudentPerformance);
router.get("/calendar", getCalendar);
router.get("/assignments/:assignmentId/:courseId/submissions",getAssignmentSubmissions);
router.get("/students/:courseId", getStudentsByCourse);
router.post("/assignments/evaluate",evaluateAssignment);
module.exports = router;