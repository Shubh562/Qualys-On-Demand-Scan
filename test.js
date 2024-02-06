

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






// ComparisonTool.scss
.comparison-container {
  display: flex;
  gap: 30px; /* Adjust the gap between the selections area and the results area */
  padding: 20px; /* Padding around the entire container */

  .selections-area {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Increase the gap between dropdowns for better visual separation */
    width: 100%;
    max-width: 400px; /* Adjust the maximum width of the dropdown area as needed */
  }

  .results-area {
    flex-grow: 1; /* Allows the results area to expand and fill the remaining space */
    padding: 20px; /* Padding inside the results area around the table */
    background-color: #f9f9f9; /* Optional background color for visual separation */
    border-radius: 8px; /* Rounds the corners of the results area */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow for depth */
  }
}

.dropdown {
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensure dropdowns use the full width available */

  label {
    margin-bottom: 5px; /* Space between label and dropdown */
  }

  select {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff; /* Ensures consistency in background color */
  }

  select:disabled {
    background-color: #eee; /* Distinguish disabled dropdowns visually */
  }
}

.compare-button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: fit-content; /* Adjust button width to fit its content */
  margin-top: 20px; /* Ensure sufficient space above the button for clear separation */
  align-self: center; /* Center-align the button relative to the selections-area */
}
