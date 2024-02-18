

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

// Interfaces to type the state and props
interface ISelections {
  application: string;
  module: string; // This might not be needed based on your description
  release: string;
  moduleName: string; // For the selected module name from the dropdown
}

interface IModuleData {
  name: string;
  testcases: string[];
  testcasesNotRunned: string[];
  dependency: string[];
}

interface IReleaseData {
  release: string;
  data: IModuleData[];
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: 'WIBSV', // Assuming a single application choice as per your setup
    module: 'card-management', // Assuming static choice for now
    release: '',
    moduleName: '',
  });

  const [releaseData, setReleaseData] = useState<IReleaseData[]>([]);
  const [modulesData, setModulesData] = useState<IModuleData[]>([]);
  const [selectedModuleData, setSelectedModuleData] = useState<IModuleData | null>(null);

  useEffect(() => {
    // Here, you'd fetch all releases data or you can modify to fetch based on the release
    // For simplicity, I'm assuming data is static or fetched from an endpoint directly
    const fetchReleaseData = async () => {
      try {
        // Example: Fetching from a static endpoint, adjust accordingly
        const response = await axios.get<IReleaseData[]>('http://your-api-endpoint/releases');
        setReleaseData(response.data);
      } catch (error) {
        console.error("Error fetching release data:", error);
        alert("Failed to fetch release data");
      }
    };

    fetchReleaseData();
  }, []);

  useEffect(() => {
    // When release is selected, filter the modules for that release
    const currentReleaseData = releaseData.find(r => r.release === selections.release);
    if (currentReleaseData) {
      setModulesData(currentReleaseData.data);
    }
  }, [selections.release, releaseData]);

  const handleCompareClick = () => {
    const moduleData = modulesData.find(m => m.name === selections.moduleName) || null;
    setSelectedModuleData(moduleData);
  };

  return (
    <div className="comparison-container">
      <div className="selections-area">
        {/* Assuming other dropdowns are static and not directly related to the comparison logic */}
        <div className="dropdown">
          <label htmlFor="release">Release</label>
          <select
            name="release"
            value={selections.release}
            onChange={(e) => setSelections(prev => ({ ...prev, release: e.target.value, moduleName: '' }))}
          >
            <option value="">Select Release</option>
            {releaseData.map((r) => (
              <option key={r.release} value={r.release}>{r.release}</option>
            ))}
          </select>
        </div>
        
        <div className="dropdown">
          <label htmlFor="moduleName">Module Name</label>
          <select
            name="moduleName"
            value={selections.moduleName}
            onChange={(e) => setSelections(prev => ({ ...prev, moduleName: e.target.value }))}
          >
            <option value="">Select Module</option>
            {modulesData.map((module) => (
              <option key={module.name} value={module.name}>{module.name}</option>
            ))}
          </select>
        </div>

        <button className="compare-button" onClick={handleCompareClick} disabled={!selections.moduleName}>
          Compare
        </button>
      </div>

      {selectedModuleData && (
        <div className="results-area">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Cases</th>
                <th>Test Cases Not Runned</th>
                <th>Dependencies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedModuleData.testcases.join(", ")}</td>
                <td>{selectedModuleData.testcasesNotRunned.join(", ")}</td>
                <td>{selectedModuleData.dependency.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ComparisonTool;
