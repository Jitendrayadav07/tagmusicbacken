const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require("handlebars");
const { promisify } = require('util');
const path = require("path")
const readFile = promisify(fs.readFile);

const sendEmail = async (email,subject,emailData) => {
  try {
    const emailTemplateSource = fs.readFileSync(path.join(__dirname,emailData.filePath), "utf8")
    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({token: emailData.token})
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: true,
      auth: {
        user: "jitendra@tagloy.com",
        pass: "ctrwhsxecactmwhn",
      },
    });

    await transporter.sendMail({
      from: "jitendra@tagloy.com",
      to: email,
      subject: subject,
      html: htmlToSend
    });
    console.log("******************** MAIL SENT ?? ******************************")
  } catch (error) {
    console.log("********************************** EMAIL ERROR !!!!!!!!!!!!!!!!!!!!", error)
  }
};

module.exports = sendEmail;