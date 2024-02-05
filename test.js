

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






// Import React and useState hook at the beginning of your file
import React, { useState } from 'react';
import './ComparisonTool.css'; // Import CSS for styling

const ComparisonTool: React.FC = () => {
  // Your existing state and functions remain here
  
  // Updated render section with labels
  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <label htmlFor="application">Application:</label>
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          {/* Add your options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="module">Module:</label>
        <select name="module" value={selections.module} onChange={handleSelectChange}>
          <option value="">Select Module</option>
          {/* Add your options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="baseBranch">Base Branch:</label>
        <select name="baseBranch" value={selections.baseBranch} onChange={handleSelectChange}>
          <option value="">Select Base Branch</option>
          {/* Add your options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="branchToCompare">Branch to Compare:</label>
        <select name="branchToCompare" value={selections.branchToCompare} onChange={handleSelectChange}>
          <option value="">Select Branch to Compare</option>
          {/* Add your options here */}
        </select>
      </div>

      <button onClick={fetchResults}>Compare</button>
      
      {/* Your existing table rendering code here */}
    </div>
  );
};

export default ComparisonTool;




/* ComparisonTool.css */
.comparison-tool {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  padding: 20px;
}

.dropdown {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dropdown label {
  font-weight: bold;
}

.dropdown select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
