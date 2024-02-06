

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






// ComparisonTool.tsx
import React, { useState } from 'react';
import './ComparisonTool.scss'; // Ensure this import path is correct

interface ISelections {
  application: string;
  module: string;
  baseBranch: string;
  branchToCompare: string;
}

interface ITableData {
  module: string;
  modified: string;
  dependency: string;
  testCases: string;
}

// Mock data for table display
const mockData: ITableData[] = [
  { module: "Module A", modified: "Yes", dependency: "Module B, Module C", testCases: "TC1, TC2, TC3" },
  { module: "Module B", modified: "No", dependency: "Module A", testCases: "TC4, TC5" },
  { module: "Module C", modified: "Yes", dependency: "Module A", testCases: "TC6, TC7, TC8, TC9" },
];

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: '',
    module: '',
    baseBranch: '',
    branchToCompare: '',
  });
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleCompareClick = () => {
    setShowTable(true); // Show the table on click
  };

  const allSelected = Object.values(selections).every(value => value !== '');

   return (
  <div className="comparison-container">
    <div className="selections-area">
      {/* Application Dropdown */}
      <div className="dropdown">
        <label htmlFor="application">Application</label>
        <select name="application" value={selections.application} onChange={(e) => setSelections({...selections, application: e.target.value, module: '', baseBranch: '', branchToCompare: ''})}>
          <option value="">Select Application</option>
          <option value="WIBSV">WIBSV</option>
          <option value="WIBAC">WIBAC</option>
        </select>
      </div>

      {/* Module Dropdown */}
      <div className="dropdown">
        <label htmlFor="module">Module</label>
        <select name="module" value={selections.module} onChange={(e) => setSelections({...selections, module: e.target.value, baseBranch: '', branchToCompare: ''})} disabled={!selections.application}>
          <option value="">Select Module</option>
          {/* Dynamically render options based on the selected application */}
        </select>
      </div>

      {/* Base Branch Dropdown */}
      <div className="dropdown">
        <label htmlFor="baseBranch">Base Branch</label>
        <select name="baseBranch" value={selections.baseBranch} onChange={(e) => setSelections({...selections, baseBranch: e.target.value, branchToCompare: ''})} disabled={!selections.module}>
          <option value="">Select Base Branch</option>
          {/* Common options for branches */}
          <option value="develop">develop</option>
          <option value="main">main</option>
          <option value="feature">feature</option>
        </select>
      </div>

      {/* Branch to Compare Dropdown */}
      <div className="dropdown">
        <label htmlFor="branchToCompare">Branch to Compare</label>
        <select name="branchToCompare" value={selections.branchToCompare} onChange={(e) => setSelections({...selections, branchToCompare: e.target.value})} disabled={!selections.baseBranch}>
          <option value="">Select Branch to Compare</option>
          {/* Common options for branches */}
          <option value="develop">develop</option>
          <option value="main">main</option>
          <option value="feature">feature</option>
        </select>
      </div>

      {/* Compare Button */}
      <button className="compare-button" onClick={handleCompareClick} disabled={!allSelected}>
        Compare
      </button>
    </div>

    {/* Results Table */}
    {showTable && (
      <div className="results-area">
        <table className="results-table">
          <thead>
            <tr>
              <th>Module</th>
              <th>Modified</th>
              <th>Dependency Changed</th>
              <th>Mapped Test Cases</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((data, index) => (
              <tr key={index}>
                <td>{data.module}</td>
                <td>{data.modified}</td>
                <td>{data.dependency}</td>
                <td>{data.testCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
};


export default ComparisonTool;






// ComparisonTool.scss
.comparison-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .selections-area, .results-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dropdown {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
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
    width: auto;
    align-self: start;
  }

  .results-table {
    border-collapse: collapse;
    width: 100%;
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
}

