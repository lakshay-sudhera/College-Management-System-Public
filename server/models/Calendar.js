const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    title: String,
    fileUrl: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  });

  module.exports = mongoose.model("Calender", calendarSchema);