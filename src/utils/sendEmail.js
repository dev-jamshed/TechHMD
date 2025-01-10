const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "thanosgaming121@gmail.com",
    pass: "ulut qmrr nhxb xdzx"
  }
});

const mailOptions = {
  from: "thanosgaming121@gmail.com",
  to: 'shazzgit@gmail.com',
  subject: 'Hello there ',
  text: 'This is a test email sent from Node.js using nodemailer. 📧💻'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log(info.response);
  }
});