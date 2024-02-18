

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
import './ComparisonTool.scss';

interface ISelections {
  application: string;
  module: string;
  release: string;
  dependency: string; // Renaming for clarity
}

interface IModuleData {
  name: string;
  testcases: string[];
  testcasesNotRunned: string[];
  dependency: string[];
}

interface IReleaseData {
  _id: string;
  release: string;
  data: IModuleData[];
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: 'WIBSV',
    module: '',
    release: '',
    dependency: '', // Initially empty, will store the module name
  });
  const [releaseData, setReleaseData] = useState<IReleaseData | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);

  useEffect(() => {
    if (selections.release) {
      fetchReleaseData(selections.release);
    }
  }, [selections.release]);

  const fetchReleaseData = async (release: string) => {
    try {
      // Assuming the URL correctly targets your backend structure
      const response = await axios.get<IReleaseData>(`http://localhost:5000/releases/${release}`);
      setReleaseData(response.data);
      setShowTable(false); // Reset table visibility
    } catch (error) {
      console.error("Error fetching release data:", error);
      alert("Failed to fetch release data");
    }
  };

  const handleCompareClick = () => {
    setShowTable(true);
  };

  return (
    <div className="comparison-container">
      <div className="selections-area">
        {/* Omitted existing dropdowns for brevity */}
        {/* Dependency Dropdown, now serves as Module Dropdown */}
        <div className="dropdown">
          <label htmlFor="dependency">Module</label>
          <select
            name="dependency"
            value={selections.dependency}
            onChange={(e) => setSelections({ ...selections, dependency: e.target.value })}
          >
            <option value="">Select Module</option>
            {releaseData?.data.map((module) => (
              <option key={module.name} value={module.name}>{module.name}</option>
            ))}
          </select>
        </div>

        <button className="compare-button" onClick={handleCompareClick} disabled={!selections.dependency}>
          Compare
        </button>
      </div>

      {/* Results Table */}
      {showTable && releaseData && selections.dependency && (
        <div className="results-area">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Cases</th>
                <th>Test Cases Not Run</th>
                <th>Dependencies</th>
              </tr>
            </thead>
            <tbody>
              {releaseData.data.filter(module => module.name === selections.dependency).map((module) => (
                <tr key={module.name}>
                  <td>{module.testcases.join(", ")}</td>
                  <td>{module.testcasesNotRunned.join(", ")}</td>
                  <td>{module.dependency.join(", ")}</td>
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

