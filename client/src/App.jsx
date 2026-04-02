import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import OTP from "./pages/OTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Courses from "./pages/admin/Courses";
import Calendar from "./pages/admin/Calendar";
import LoginLogs from "./pages/admin/LoginLogs";
import Assignments from "./pages/professor/Assignments";
import ProfessorCourses from "./pages/professor/Courses";
import ProfessorCalendar from "./pages/professor/Calendar";
import Tests from "./pages/professor/Tests";
import Attendance from "./pages/professor/Attendance";
import Analytics from "./pages/professor/Analytics";
import TestEvaluation from "./pages/professor/TestEvaluation";
import StudentAssignments from "./pages/student/Assignments";
import StudentTests from "./pages/student/Tests";
import Grades from "./pages/student/Grades";
import StudentAttendance from "./pages/student/Attendance";
import Progress from "./pages/student/Progress";
import StudentCalendar from "./pages/student/Calendar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import AssignmentEvaluation from "./pages/professor/AssignmentEvaluation";
import ProfessorDashboard from "./pages/professor/ProfessorDashboard";
import AssignStudents from "./pages/admin/AdminAssignStudents";
import StudentDashboard from "./pages/student/StudentDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTP />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/set-password/:token" element={<ResetPassword />} />

        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        //admin routes

        <Route
          path="/admin"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />
        {/* <Route path="/admin" element={
          <DashboardLayout>
            <AdminDashboard />
          </DashboardLayout>
        } /> */}

        <Route path="/admin/users" element={
          <DashboardLayout>
            <Users />
          </DashboardLayout>
        } />

        <Route path="/admin/courses" element={
          <DashboardLayout>
            <Courses />
          </DashboardLayout>
        } />
        <Route path="/admin/assign-students" element={
          <DashboardLayout>

          <AssignStudents />
          </DashboardLayout>
          } />
        <Route path="/admin/calendar" element={
          <DashboardLayout>
            <Calendar />
          </DashboardLayout>
        } />

        <Route path="/admin/logs" element={
          <DashboardLayout>
            <LoginLogs />
          </DashboardLayout>
        } />

        //professor routes

        <Route path="/professor" element={
          <DashboardLayout>
            <ProfessorDashboard/>
          </DashboardLayout>
        } />

        <Route path="/professor/courses" element={
          <DashboardLayout><ProfessorCourses /></DashboardLayout>
        } />

        <Route path="/professor/assignments" element={
          <DashboardLayout><Assignments /></DashboardLayout>
        } />

        <Route path="/professor/tests" element={
          <DashboardLayout><Tests /></DashboardLayout>
        } />

        <Route
          path="/professor/assignment-evaluation"
          element={
            <DashboardLayout>
              <AssignmentEvaluation />
            </DashboardLayout>
          }
        />
        <Route path="/professor/test-evaluation" element={
          <DashboardLayout>
            <TestEvaluation />
          </DashboardLayout>
        } />
        <Route path="/professor/analytics" element={
          <DashboardLayout><Analytics /></DashboardLayout>
        } />
        <Route path="/professor/attendance" element={
          <DashboardLayout><Attendance /></DashboardLayout>
        } />
        <Route path="/professor/calendar" element={
          <DashboardLayout><ProfessorCalendar /></DashboardLayout>
        } />

        //student routes


        <Route path="/student" element={
          <DashboardLayout><StudentDashboard/></DashboardLayout>
        } />

        <Route path="/student/assignments" element={
          <DashboardLayout><StudentAssignments /></DashboardLayout>
        } />

        <Route path="/student/tests" element={
          <DashboardLayout><StudentTests /></DashboardLayout>
        } />

        <Route path="/student/grades" element={
          <DashboardLayout><Grades /></DashboardLayout>
        } />

        <Route path="/student/attendance" element={
          <DashboardLayout><StudentAttendance /></DashboardLayout>
        } />

        <Route path="/student/progress" element={
          <DashboardLayout><Progress /></DashboardLayout>
        } />

        <Route path="/student/calendar" element={
          <DashboardLayout><StudentCalendar /></DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
