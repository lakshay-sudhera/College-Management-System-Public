const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const professorRoutes = require("./routes/professorRoutes");
const studentRoutes = require("./routes/studentRoutes");
// const upload = require("../middlewares/upload");

dotenv.config();
connectDB();
const app = express();

// Middleware
app.use(cors({
  origin: "https://college-management-system-public-2.vercel.app",
  credentials: true
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api", testRoutes);
const PORT = process.env.PORT || 5000;

//auth routes
app.use("/api/auth", authRoutes);

//admin routes
app.use("/api/admin", adminRoutes);

//professor routes
app.use("/api/professor", professorRoutes);

//student routes
app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});