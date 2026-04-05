const User = require("../models/User");
const Course = require("../models/Course");
const Calendar = require("../models/Calendar");
const LoginLog = require("../models/LoginLog")

//  Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add students to courses
exports.addStudentToCourse = async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    res.json({ message: "Student added to course" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 //remove students from the courses
 
 exports.removeStudentFromCourse = async (req, res) => {
   const { courseId, studentId } = req.body;
 
   const course = await Course.findById(courseId);
 
   course.students = course.students.filter(
     (id) => id.toString() !== studentId
   );
 
   await course.save();
 
   res.json({ message: "Student removed" });
 };
//  Get users by role
exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;

  try {
    const users = await User.find({ role }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body,
      {
        new: true,
      })
      .select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//course management
//  Create course
exports.createCourse = async (req, res) => {
  const { name, code, professor } = req.body;

  try {
    const course = await Course.create({
      name,
      code,
      professor,
    });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      //populate Specifies paths which should be populated with other documents.
      .populate("professor", "name email")
      .populate("students", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get course by id
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate("students", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//  Delete course
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await Course.findByIdAndDelete(id);
    res.json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Upload calendar

exports.uploadCalendar = async (req, res) => {

  // console.log(req.file);

  
  try {
    const calendar = await Calendar.create({
      title: req.body.title,
      fileUrl:req.file.path, // Cloudinary URL
      // uploadedBy: req.user._id,
      uploadedBy: req.user.id,

    });
    // console.log(calendar.url);
    res.json(calendar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get calendar
exports.getCalendar = async (req, res) => {
  try {
    const calendars = await Calendar.find();
    // console.log(calendars);
    res.json(calendars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//view logs
exports.getLoginLogs = async (req, res) => {
  try {
    const logs = await LoginLog.find()
      .populate("user", "name email role");

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Important Improvements (Do This Later)
// Validate professor role before assigning course
// Prevent deleting users linked to courses
// Add pagination