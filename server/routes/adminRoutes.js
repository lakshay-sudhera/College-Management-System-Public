const express = require("express");
const router = express.Router();
const upload=require("../middlewares/upload")
const User=require("../models/User")
const Course=require("../models/Course")

const {
  getAllUsers,
  getUsersByRole,
  updateUser,
  deleteUser,
  createCourse,
  getCourses,
  deleteCourse,
  uploadCalendar,
  getCalendar,
  getLoginLogs,
  addStudentToCourse,
  removeStudentFromCourse,
  getCourseById
} = require("../controllers/adminController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");


//  All routes protected + admin only
router.use(protect, authorizeRoles("admin"));

router.get("/dashboard", protect, async (req, res) => {
  const students = await User.countDocuments({ role: "student" });
  const professors = await User.countDocuments({ role: "professor" });
  const courses = await Course.countDocuments();

  res.json({ students, professors, courses });
});

//  User Management
router.get("/users", getAllUsers);
router.get("/users/:role", getUsersByRole);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


//  Course Management
router.post("/courses", createCourse);
router.get("/courses", getCourses);
router.get("/courses/:courseId", getCourseById);
router.delete("/courses/:id", deleteCourse);
router.post("/courses/add-student", addStudentToCourse);
router.post("/courses/remove-student", removeStudentFromCourse);
//calender manangement

router.post("/calendar", upload.single("file"), uploadCalendar);
router.get("/calendar", getCalendar);

//login logs
router.get("/login-logs", getLoginLogs);
module.exports = router;