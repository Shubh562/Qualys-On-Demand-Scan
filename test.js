

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
import './ComparisonTool.scss'; // Assuming SCSS is set up

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

  const moduleOptions = {
    WIBSV: ['wibsv-web', 'wibsv-card-management', 'wibsv-core', 'wibsv-profile-and-settings'],
    WIBAC: ['wibac-accounts', 'wibac-securewf-core', 'wibac-securewf-core-delegates', 'wibac-securewf-core-components'],
  };

  const commonOptions = ['develop', 'main', 'feature'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: value,
      ...(name === 'application' && { module: '' }), // Reset module when application changes
    }));
  };

  const fetchResults = async () => {
    // Implement fetching logic here
    console.log('Comparing...', selections);
  };

  const allSelected = Object.values(selections).every(value => value !== '');

  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <label htmlFor="application">Application:</label>
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          <option value="WIBSV">WIBSV</option>
          <option value="WIBAC">WIBAC</option>
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="module">Module:</label>
        <select 
          name="module" 
          value={selections.module} 
          onChange={handleSelectChange}
          disabled={!selections.application} // Disable until an application is selected
        >
          <option value="">Select Module</option>
          {selections.application && moduleOptions[selections.application].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="baseBranch">Base Branch:</label>
        <select 
          name="baseBranch" 
          value={selections.baseBranch} 
          onChange={handleSelectChange}
          disabled={!selections.module} // Disable until a module is selected
        >
          <option value="">Select Base Branch</option>
          {commonOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="branchToCompare">Branch to Compare:</label>
        <select 
          name="branchToCompare" 
          value={selections.branchToCompare} 
          onChange={handleSelectChange}
          disabled={!selections.baseBranch} // Disable until a base branch is selected
        >
          <option value="">Select Branch to Compare</option>
          {commonOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button onClick={fetchResults} disabled={!allSelected}>Compare</button>
    </div>
  );
};

export default ComparisonTool;
