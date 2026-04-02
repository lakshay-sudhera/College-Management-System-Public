const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const generateOTP=require("../utils/generateOTP")
const sendEmail = require("../utils/sendEmail");
const LoginLog = require("../models/LoginLog");

//register admin for first time(checking)
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await require("bcryptjs").genSalt(10);
    const hashedPassword = await require("bcryptjs").hash(password, salt);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    res.json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //verification is necessary for login
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify your email before logging in",
      });
    }
    
    // 2FA otp sysytem
      try {
        const otp = generateOTP();
    
        user.otp = otp;
        user.otpExpire = Date.now() + 5 * 60 * 1000; // 5 min
    
        await user.save();
        // console.log(otp);
        await sendEmail({
          email: user.email,
          subject: "Your OTP Code",
          message: `
            <h2>OTP Verification</h2>
            <p>Your OTP is: <b>${otp}</b></p>
            <p>This OTP will expire in 5 minutes.</p>
          `,
        });
    
        res.json({
          message: "OTP sent to your email",
          userId: user._id,
        });
 
  
        } 
        catch (error) {
           res.status(500).json({ message: error.message },{error:"otp cant generated"});
        }
        //save logs in login

          await LoginLog.create({
            user: user._id,
            email: user.email,
            ip: req.ip,
          });
  } catch (error) {
    res.status(500).json({ message: error.message },{error:"login unsuccesful"});
  }
};

//otp verification 
// ⚠️ Important Notes
// Right now OTP is printed in console
// Next step → send via email (Nodemailer)
// You can later:
// Enable/disable 2FA per user
// Add Google Authenticator
// Step 1: Verify OTP 
exports.verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    // step 2 :✅ NOW give token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  Admin creates user
exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: "temp123", // temporary
      role,
      isVerified:false,
      verificationToken:"",
      verificationExpire:"",
    });
    //  Create verification token for verification through email
    const verifyToken = crypto.randomBytes(20).toString("hex");

    user.verificationToken = verifyToken;
    user.verificationExpire = Date.now() + 24 * 60 * 60 * 1000; // 24 hrs

    await user.save();

    // Send email
    // console.log("email sent for verification");
    
    await sendEmail({
      email: user.email,
      subject: "Verify Your Email",
      message: `
        <h2>Email Verification</h2>
        <p>Click below to verify your account:</p>
        <a href="${process.env.CLIENT_URL}/verify-email/${verifyToken}">
          Verify Email
        </a>
      `,
    });

    res.json({ message: "User created. Verification email sent." });

    // Generate reset token for creating a password
    const resetToken = crypto.randomBytes(20).toString("hex");   //The latest version of CryptoJS already uses the native Crypto module for random number generation, since Math.random() is not crypto-safe. 

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();
    await sendEmail({
      email: user.email,
      subject: "Set Your Password",
      message: `
        <h2>Welcome to College System</h2>
        <p>Click below to set your password:</p>
        <a href="${process.env.CLIENT_URL}/set-password/${resetToken}">
          Set Password
        </a>
      `,
    });
    
    res.json({ message: "User created and an email is sent for password creation" });
    // const resetUrl = `http://localhost:5000/api/auth/set-password/${resetToken}`;
    // res.json({ message: "User created", resetUrl });


   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    else{
      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationExpire = undefined;
    }
  


    res.json({ message: "Email verified successfully" });
    await user.save();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//set password(first time)
exports.setPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.json({ message: "Password set successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  //forgot password
  exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const resetToken = crypto.randomBytes(20).toString("hex");
  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
      await user.save();
  
      await sendEmail({
        email: user.email,
        subject: "Password Reset",
        message: `
          <h2>Password Reset</h2>
          <p>Click below to reset your password:</p>
          <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">
            Reset Password
          </a>
        `,
      });
      
      res.json({ message: "Reset link sent to email" });

      // const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;
      // res.json({ message: "Reset link sent", resetUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //reset password
  exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Token expired" });
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      res.json({ message: "Password reset successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };