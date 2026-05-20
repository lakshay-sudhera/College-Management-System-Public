const express = require("express");
const cors = require("cors");
const app = express();
// Middleware
app.use(cors({
  origin: "https://college-management-system-public-2.vercel.app",
  credentials: true
}));
app.use(express.json());
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const professorRoutes = require("./routes/professorRoutes");
const studentRoutes = require("./routes/studentRoutes");
// const upload = require("../middlewares/upload");




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