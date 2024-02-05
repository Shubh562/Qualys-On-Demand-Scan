

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
import './ComparisonTool.scss'; // Make sure the path matches your project structure

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

  // Define application options separately
  const applicationOptions: string[] = ['WIBSV', 'WIBAC'];

  // Define module options based on selected application
  const moduleOptions: Record<string, string[]> = {
    WIBSV: ['wibsv-web', 'wibsv-card-management', 'wibsv-core', 'wibsv-profile-and-settings'],
    WIBAC: ['wibac-accounts', 'wibac-securewf-core', 'wibac-securewf-core-delegates', 'wibac-securewf-core-components'],
  };

  // Common options for baseBranch and branchToCompare
  const commonOptions: string[] = ['develop', 'main', 'feature'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelections(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'application' && { module: '', baseBranch: '', branchToCompare: '' }), // Reset other fields when application changes
    }));
  };

  const fetchResults = async () => {
    console.log('Comparing...', selections);
  };

  const allSelected = Object.values(selections).every(value => value !== '');

  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <label>Application</label>
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          {applicationOptions.map((appOption) => (
            <option key={appOption} value={appOption}>{appOption}</option>
          ))}
        </select>
      </div>

      {/* Conditional rendering for Module based on selected Application */}
      <div className="dropdown">
        <label>Module</label>
        <select name="module" value={selections.module} onChange={handleSelectChange} disabled={!selections.application}>
          <option value="">Select Module</option>
          {selections.application && moduleOptions[selections.application].map((modOption: string) => (
            <option key={modOption} value={modOption}>{modOption}</option>
          ))}
        </select>
      </div>

      {/* Base Branch and Branch to Compare dropdowns */}
      <div className="dropdown">
        <label>Base Branch</label>
        <select name="baseBranch" value={selections.baseBranch} onChange={handleSelectChange} disabled={!selections.module}>
          <option value="">Select Base Branch</option>
          {commonOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label>Branch to Compare</label>
        <select name="branchToCompare" value={selections.branchToCompare} onChange={handleSelectChange} disabled={!selections.baseBranch}>
          <option value="">Select Branch to Compare</option>
          {commonOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button className="compare-button" onClick={fetchResults} disabled={!allSelected}>
        Compare
      </button>
    </div>
  );
};

export default ComparisonTool;
