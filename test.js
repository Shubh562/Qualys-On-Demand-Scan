

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
import './ComparisonTool.scss'; // Updated for SCSS file

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

  // Placeholder for the fetchResults function
  const fetchResults = async () => {
    // Placeholder for fetching data based on selections
    console.log('Fetching data...', selections);
  };

  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <label htmlFor="application">Application:</label>
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          {/* Populate with actual options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="module">Module:</label>
        <select name="module" value={selections.module} onChange={handleSelectChange}>
          <option value="">Select Module</option>
          {/* Populate with actual options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="baseBranch">Base Branch:</label>
        <select name="baseBranch" value={selections.baseBranch} onChange={handleSelectChange}>
          <option value="">Select Base Branch</option>
          {/* Populate with actual options here */}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="branchToCompare">Branch to Compare:</label>
        <select name="branchToCompare" value={selections.branchToCompare} onChange={handleSelectChange}>
          <option value="">Select Branch to Compare</option>
          {/* Populate with actual options here */}
        </select>
      </div>

      <button onClick={fetchResults}>Compare</button>
      {/* Placeholder for the results table */}
    </div>
  );
};

export default ComparisonTool;
