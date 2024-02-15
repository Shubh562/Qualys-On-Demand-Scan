

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






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComparisonTool.scss'; // Ensure this import path is correct

interface ISelections {
  application: string;
  module: string;
  release: string; // Updated to use release instead of branchToCompare
}

interface IReleaseData {
  release: string;
  module_name: string[];
  testcases: string[];
  dependency: string[];
  testcases_not_run: string[];
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: 'WIBSV', // Default to WIBSV as it's the only option
    module: 'card-management', // Default to card-management as it's the only option
    release: '',
  });
  const [releaseData, setReleaseData] = useState<IReleaseData | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);

  const handleCompareClick = async () => {
    if (selections.release) {
      try {
        const response = await axios.get(`http://localhost:5000/data/release/${selections.release}`);
        setReleaseData(response.data);
        setShowTable(true); // Show the table on successful data fetch
      } catch (error) {
        console.error("Error fetching release data:", error);
        alert("Failed to fetch release data");
      }
    }
  };

  // Ensure dependencies dropdown is filled correctly
  useEffect(() => {
    if (selections.application && selections.module) {
      // Potentially fetch and set available releases dynamically
      // For now, the release options are hard-coded
    }
  }, [selections.application, selections.module]);

  return (
    <div className="comparison-container">
      <div className="selections-area">
        {/* Application Dropdown */}
        <div className="dropdown">
          <label htmlFor="application">Application</label>
          <select name="application" value={selections.application} onChange={(e) => setSelections({...selections, application: e.target.value})}>
            <option value="WIBSV">WIBSV</option>
          </select>
        </div>

        {/* Module Dropdown */}
        <div className="dropdown">
          <label htmlFor="module">Module</label>
          <select name="module" value={selections.module} onChange={(e) => setSelections({...selections, module: e.target.value})}>
            <option value="card-management">Card Management</option>
          </select>
        </div>

        {/* Release Dropdown */}
        <div className="dropdown">
          <label htmlFor="release">Release</label>
          <select name="release" value={selections.release} onChange={(e) => setSelections({...selections, release: e.target.value})}>
            <option value="">Select Release</option>
            <option value="R24.01.00">R24.01.00</option>
            <option value="R23.12.00">R23.12.00</option>
            <option value="R23.11.00">R23.11.00</option>
          </select>
        </div>

        {/* Compare Button */}
        <button className="compare-button" onClick={handleCompareClick} disabled={!selections.release}>
          Compare
        </button>
      </div>

      {/* Results Table */}
      {showTable && releaseData && (
        <div className="results-area">
          <table className="results-table">
            <thead>
              <tr>
                <th>Release</th>
                <th>Module Name</th>
                <th>Dependencies</th>
                <th>Test Cases</th>
                <th>Test Cases Not Run</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{releaseData.release}</td>
                <td>{releaseData.module_name.join(", ")}</td>
                <td>{releaseData.dependency.join(", ")}</td>
                <td>{releaseData.testcases.join(", ")}</td>
                <td>{releaseData.testcases_not_run.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
