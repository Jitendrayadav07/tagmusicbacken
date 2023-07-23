const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require("handlebars");
const { promisify } = require('util');
const path = require("path")
const readFile = promisify(fs.readFile);


const sendEmail = async (email_id,subject,personDetails) => {
  try {
    const htmlToSend = `
    <h2>New User have Register to Website</h2>
<table>
  <tr>
    <th>Field Name</th>
    <th>Value</th>
  </tr>
  <tr>
    <td">Full Name</td>
    <td style="text-align: center;">${personDetails.name}</td>
  </tr>
  <tr>
    <td>Email Name</td>
    <td style="text-align: center;">${personDetails.email}</td>
  </tr>
  <tr>
    <td>Mobile Number</td>
    <td style="text-align: center;">${personDetails.phone_number}</td>
  </tr>
  <tr>
    <td>Display Name</td>
    <td style="text-align: center;">${personDetails.display_name}</td>
  </tr>
</table> 
`;
    // const emailTemplateSource = fs.readFileSync(path.join(__dirname,emailData.filePath), "utf8")
    // const template = handlebars.compile(emailTemplateSource)
    // const htmlToSend = template({token: emailData.token})
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
      to: email_id,
      subject: subject,
      html: htmlToSend
    });
    console.log("******************** MAIL SENT ?? ******************************")
  } catch (error) {
    console.log("********************************** EMAIL ERROR !!!!!!!!!!!!!!!!!!!!", error)
  }
};

module.exports = sendEmail;