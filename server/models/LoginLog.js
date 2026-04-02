const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ip: String,
});

module.exports = mongoose.model("LoginLog", loginLogSchema);