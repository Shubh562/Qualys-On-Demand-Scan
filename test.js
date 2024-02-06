

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
  gap: 30px; /* Space between selections area and results area */
  padding: 20px;

  .selections-area {
    flex: 1; /* Allows this area to take up the space it needs, up to its max-width */
    max-width: 400px; /* Maximum width for the dropdown area, adjust as needed */
  }

  .results-area {
    flex: 2; /* Allows the results area to expand and fill the remaining space */
    padding: 20px;
    overflow-x: auto; /* Adds horizontal scrolling if the table exceeds the area's width */
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
.results-table {
  width: 100%; /* Ensures the table expands to fill its container */
  margin-top: 20px; /* Adds space above the table for separation */
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  tr:nth-child(even) td {
    background-color: #f2f2f2; /* Alternating row background for better readability */
  }

  tr:nth-child(odd) td {
    background-color: #ffffff;
  }

  /* Ensure column styling is consistent and visually separated */
  td:nth-child(odd) {
    background-color: #f9f9f9; /* Light grey for odd columns */
  }
  td:nth-child(even) {
    background-color: #ffffff; /* White for even columns */
  }
}
