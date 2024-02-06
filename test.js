

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
        <div className="dropdown">
          <label htmlFor="application">Application</label>
          <select name="application" value={selections.application} onChange={(e) => setSelections({...selections, application: e.target.value, module: '', baseBranch: '', branchToCompare: ''})}>
            <option value="">Select Application</option>
            <option value="WIBSV">WIBSV</option>
            <option value="WIBAC">WIBAC</option>
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="module">Module</label>
          <select name="module" value={selections.module} onChange={(e) => setSelections({...selections, module: e.target.value})} disabled={!selections.application}>
            <option value="">Select Module</option>
            {/* Options are dynamically rendered based on the application selection */}
          </select>
        </div>

        {/* Repeat the above structure for baseBranch and branchToCompare dropdowns with commonOptions */}

        <button className="compare-button" onClick={handleCompareClick} disabled={!allSelected}>
          Compare
        </button>
      </div>

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
