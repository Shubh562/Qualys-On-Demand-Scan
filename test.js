

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
  gap: 20px; /* Adjust gap between selections area and results area */
  padding: 20px; /* Padding around the entire container for spacing */

  .selections-area {
    flex: 1; /* Allows the selections area to take the necessary space */
    max-width: 400px; /* Maximum width for the dropdown area */
  }

  .results-area {
    flex: 2; /* Allows the results area to take up twice the space of the selections area, filling the remaining space */
    padding: 20px; /* Padding inside the results area for spacing around the table */
    background-color: #f9f9f9; /* Optional: Adds a slight background color for visual separation */
    border-radius: 8px; /* Optional: Rounds the corners of the results area */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Optional: Adds a subtle shadow for depth */
  }
}

.dropdown {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-weight: bold;
  }

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  select:disabled {
    background-color: #eee;
  }
}

.compare-button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: auto; /* Button width is automatically adjusted */
  align-self: flex-start; /* Aligns the button to the start of the flex container */
}

.results-table {
  width: 100%; /* Table fills the width of the results area */
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
  }

  td:nth-child(odd) {
    background-color: #f2f2f2;
  }

  td:nth-child(even) {
    background-color: #fff;
  }
}
