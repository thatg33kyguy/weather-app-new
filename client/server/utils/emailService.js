const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or another email service
  port: 587, // SMTP server port
  secure: false, // Use TLS (true for port 465, false for other ports)
  auth: {
    user: 'darjeeling386@gmail.com', // Your email address
    pass: 'Raj@12345' // Your email password or application-specific password
  }
});

const sendEmail = (to, subject, text) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text
//   };

//   return transporter.sendMail(mailOptions);
console.log("Trying to send email ")
};

module.exports = sendEmail;
