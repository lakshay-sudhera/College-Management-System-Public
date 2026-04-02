const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "professor", "student"],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    //Instead of direct password, we send a setup link
    resetPasswordToken:{
      type:String,
    } ,
    resetPasswordExpire: {
      type:Date,
    },
    otp: {
      type:String,
    },
    otpExpire: {
      type:Date,
    },
    verificationToken: {
      type:String,
    },
    verificationExpire: {
      type:Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);