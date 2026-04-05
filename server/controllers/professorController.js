const Course = require("../models/Course");
const Assignment = require("../models/Assignment");
const Attendance = require("../models/Attendance");
const Grade = require("../models/Grade");
const Test = require("../models/Test");
const Calendar = require("../models/Calendar");

exports.getMyCourses = async (req, res) => {
  try {
    // console.log(req.user)
    const courses = await Course.find({ professor: req.user.id });    //here req.user._id is wrong
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAssignment = async (req, res) => {
  const { title, courseId } = req.body;

  try {
    const assignment = await Assignment.create({
      title,
      course: courseId,
      // professor:req.user.id
    });

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//grades on assignments
exports.addGrade = async (req, res) => {
  const { courseId, studentId, assignment, marks } = req.body;

  try {
    const grade = await Grade.create({
      course: courseId,
      student: studentId,
      assignment,
      test: "",
      marks,
    });

    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.markAttendanceBulk = async (req, res) => {
  const attendanceData = req.body;
  // console.log(attendanceData);
  
  try {
    // Optional: prevent duplicate for same date
    //for deleting dublicate values
    // await Attendance.deleteMany({
    //   course: records[0].course,
    //   date: {
    //     $gte: new Date().setHours(0, 0, 0, 0),
    //     $lte: new Date().setHours(23, 59, 59, 999),
    //   },
    // });
    const records = attendanceData.map((item) => ({
      course: item.courseId,
      student: item.studentId,
      status: item.status,
      date: new Date(),
    }));
   
    
    await Attendance.insertMany(records);

    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.markAttendance = async (req, res) => {
  const { courseId, studentId, status } = req.body;

  try {
    const attendance = await Attendance.create({
      course: courseId,
      student: studentId,
      status,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTest = async (req, res) => {
  const { title, courseId, totalMarks } = req.body;

  try {
    const test = await Test.create({
      title,
      course: courseId,
      totalMarks,
    });

    res.json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTestsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const tests = await Test.find({ course: courseId })
    .populate("course", "name code");
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAssignmentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const assignments = await Assignment.find({ course: courseId })
    .populate("course", "name code");
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate("students", "name email");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId, courseId } = req.params;

    const assignment = await Assignment.find({
      course: courseId,
    }).findById(
      assignmentId,
    ).populate("submissions.student", "name email");

    res.json(assignment.submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getTestSubmissions = async (req, res) => {
  try {
    const { testId , courseId} = req.params;
    // console.log(testId,courseId);
    const test = await Test.find({
      course: courseId,
    }).findById(testId)
      .populate("submissions.student", "name email");
    // console.log(test.submissions);

    res.json(test.submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.evaluateAssignment = async (req, res) => {
  const { assignmentId,courseId,studentId, marks } = req.body;

  try {
    const assignment = await Assignment.find({
      course: courseId,
    }).findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    const submission = assignment.submissions.find((s) => {
      if (!s.student) return false; // IMPORTANT FIX
    
      return s.student._id
        ? s.student._id.equals(studentId)
        : s.student.equals(studentId);
    });
    
    if (!submission) {
      // console.log("submissions not found");

      return res.status(404).json({ message: "Submission not found" });
    }
    else {
      // console.log("submissions found");
      // console.log("studentId from frontend:", studentId);
      // console.log("submissions:", test.submissions);
      submission.grade = marks;

      await assignment.save();



      res.json({ message: "Assignment evaluated successfully" });
    }

  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.evaluateTest = async (req, res) => {
  const { testId, courseId, studentId, marks } = req.body;
  // console.log(testId, studentId, marks);
  try {
    const test = await Test.find({
      course: courseId,
    }).findById(testId);

    if (!test) {
      // console.log("test id not found");

      return res.status(404).json({ message: "Test not found" });
    }

    // console.log(test);
    const submission = test.submissions.find((s) => {
      if (!s.student) return false; //  IMPORTANT FIX
    
      return s.student._id
        ? s.student._id.equals(studentId)
        : s.student.equals(studentId);
    });
    
    if (!submission) {
      console.log("submissions not found");

      return res.status(404).json({ message: "Submission not found" });
    }
    else {
      // console.log("submissions found");
      // console.log("studentId from frontend:", studentId);
      // console.log("submissions:", test.submissions);
      submission.marksObtained = marks;
      submission.evaluated = true;

      await test.save();



      res.json({ message: "Test evaluated" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//grades on test
exports.addTestGrade = async (req, res) => {
  const { courseId, studentId, test, marks } = req.body;
  // console.log( courseId, studentId, testTitle, marks );
  // console.log(req.body);

  try {
    const grade = await Grade.create({
      course: courseId,
      student: studentId || " ",
      assignment: "",
      test: test,
      marks,
    });
    // console.log(grade);
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get advanced course analytics
exports.getAdvancedAnalytics = async (req, res) => {
  const { courseId } = req.params;

  try {
    const grades = await Grade.find({ course: courseId });
    const attendance = await Attendance.find({ course: courseId });
    //find : returns a list of documents that match filter

    const testList = grades.filter((a) => a.assignment.trim() === "")
    const avgTestMarks =( testList.reduce((sum, g) => sum + (g.marks || 0), 0) / testList.length ) || 0;
    const assignmentList = grades.filter((a) => a.test.trim() === "")
    const avgAssignmentMarks = assignmentList.reduce((sum, g) => sum + (g.marks||0), 0) / assignmentList.length || 0;


    const present = attendance.filter(a => a.status === "present").length;


    const attendancePercentage =
      (present / attendance.length) * 100 || 0;

    res.json({
      totalTest: testList.length,
      averageTestMarks: avgTestMarks.toFixed(2),
      totalAssignments: assignmentList.length,
      averageAssignmentMarks: avgAssignmentMarks.toFixed(2),
      attendancePercentage:attendancePercentage.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Student-wise Performance
exports.getStudentPerformance = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const grades = await Grade.find({
      student: studentId,
      course: courseId,
    });

    const attendance = await Attendance.find({
      student: studentId,
      course: courseId,
    });
    const testList = grades.filter((a) => a.assignment.trim() === "")
    const avgTestMarks = testList.reduce((sum, g) => sum + (g.marks||0), 0) / testList.length || 0;

    const assignmentList = grades.filter((a) => a.test.trim() === "")
    const avgAssignmentMarks = assignmentList.reduce((sum, g) => sum + (g.marks||0), 0) / assignmentList.length || 0;


    const present = attendance.filter(a => a.status === "present").length;
    const attendancePercent =
      (present / attendance.length) * 100 || 0;

    res.json({
      averageTestMarks: avgTestMarks.toFixed(2),
      averageAssignmentMarks: avgAssignmentMarks.toFixed(2),
      attendancePercent:attendancePercent.toFixed(2),
      totalTests: testList.length,
      totalAssignments: assignmentList.length
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



//  Important Improvements (Do Later)
// Ensure professor owns the course before modifying it
// Prevent duplicate attendance for same day
// Add assignment submission tracking