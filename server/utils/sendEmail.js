const nodemailer = require("nodemailer");
// We will implement:
// Send OTP via email
// Send password reset link
// Send password setup link (admin-created users)
//email verification

//  IMPORTANT (Gmail Setup)
// If using Gmail:
// Enable 2-Step Verification
// Generate App Password (NOT your real password)


const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"College System" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;