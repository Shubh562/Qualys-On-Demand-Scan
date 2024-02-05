

const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: '10.102.206.75',
      port: 25,
      secure: false, // true for 465, false for other ports
      tls:{
        rejectUnauthorized:false,
      },
      auth: {
        user: 'Meghna.chattaraj@vcontractor.co.za',
        pass: 'P@$$w0rd25@2023'
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Meghna.chattaraj@vcontractor.co.za', // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err);
  }
}
sendEmail('kumarshubham562@gmail.com','scan reference','heyyy your refrence');






/* ComparisonTool.scss */
$btn-bg-color: #007bff;
$btn-bg-hover-color: #0056b3;

.comparison-tool {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  padding: 20px;

  .dropdown {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: bold;
    }

    select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 250px;
    }
  }

  button {
    padding: 10px 20px;
    background-color: $btn-bg-color;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: $btn-bg-hover-color;
    }
  }
}
