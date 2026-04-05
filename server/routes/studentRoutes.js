const express = require("express");
const router = express.Router();

const {
  submitAssignment,
  submitTest,
  getMyGrades,
  getMyAttendance,
  getMyProgress,
  getCalendar,
  getAssignments,
  getStudentTests,
  getStudentAssignments
} = require("../controllers/studentController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

// Only student
router.use(protect, authorizeRoles("student"));
router.get("/assignments",getAssignments)
router.get("/tests", getStudentTests);
router.get("/getAssignments",getStudentAssignments);
router.post("/assignments/submit", upload.single("file"),submitAssignment);
router.post("/tests/submit",upload.single("file"), submitTest);
router.get("/grades", getMyGrades);
router.get("/attendance", getMyAttendance);
router.get("/progress", getMyProgress);
router.get("/calendar", getCalendar);

module.exports = router;