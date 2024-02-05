

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






import React, { useState } from 'react';
import './ComparisonTool.css'; // Ensure this path matches your CSS file's location

interface ISelections {
  application: string;
  module: string;
  baseBranch: string;
  branchToCompare: string;
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: '',
    module: '',
    baseBranch: '',
    branchToCompare: '',
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: value,
    }));
  };

  // Your fetchResults function and other logic here

  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <label htmlFor="application">Application:</label>
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          {/* Populate with actual options here */}
        </select>
      </div>

      {/* Repeat for other dropdowns */}

      <button onClick={() => {}}>Compare</button>
      {/* Your table rendering logic */}
    </div>
  );
};

export default ComparisonTool;
