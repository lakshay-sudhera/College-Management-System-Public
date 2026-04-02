const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginUser,
  verifyOTP,
  createUser,
  verifyEmail,
  setPassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

// Public
router.post("/register-admin", registerAdmin);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/set-password/:token", setPassword);

// Admin only
router.post("/create-user", protect, authorizeRoles("admin"), createUser);
//POST : {{server}}/auth/create-user
// Authorization: Bearer <admin_token>
module.exports = router;