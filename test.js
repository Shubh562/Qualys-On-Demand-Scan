

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
    application: 'WIBSV',
    module: 'card-management',
    release: '',
    moduleName: '',
  });

  const [modulesData, setModulesData] = useState<IModuleData[]>([]);
  const [selectedModuleData, setSelectedModuleData] = useState<IModuleData | null>(null);

  // Fetch release-specific data when a new release is selected
  useEffect(() => {
    if (selections.release) {
      const fetchReleaseData = async () => {
        try {
          // Dynamically construct the URL with the selected releaseId
          const url = `http://your-api-endpoint/releases/${selections.release}`;
          const response = await axios.get<IReleaseData>(url);
          setModulesData(response.data.data); // Assuming the response structure matches IReleaseData
        } catch (error) {
          console.error("Error fetching release data:", error);
          alert("Failed to fetch release data for the selected release");
        }
      };

      fetchReleaseData();
    }
  }, [selections.release]);

  const handleCompareClick = () => {
    const moduleData = modulesData.find(m => m.name === selections.moduleName) || null;
    setSelectedModuleData(moduleData);
  };

  return (
    <div className="comparison-container">
      <div className="selections-area">
        {/* Other dropdowns are static, focusing on dynamic release and module dropdowns */}
        <div className="dropdown">
          <label htmlFor="release">Release</label>
          <select
            name="release"
            value={selections.release}
            onChange={(e) => setSelections(prev => ({ ...prev, release: e.target.value, moduleName: '' }))}
          >
            <option value="">Select Release</option>
            {/* Populate with your releases. This part might be static or fetched separately. */}
            <option value="R24.01.00">R24.01.00</option>
            <option value="R23.12.00">R23.12.00</option>
            <option value="R23.11.00">R23.11.00</option>
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





.comparison-container {
  font-family: Arial, sans-serif;
  max-width: 100%;
  margin: 20px auto;
  overflow-x: auto;
}

.selections-area {
  margin-bottom: 20px;
}

.dropdown {
  margin-right: 10px;
  label {
    margin-right: 5px;
  }
  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  th, td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: white;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  tr:hover {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
}

.compare-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ComparisonTool.scss'; // Ensure the correct path to your CSS file

// Define TypeScript interfaces for your data structures
interface IFeatureTest {
  feature: string;
  tests: string[];
}

interface IModuleData {
  name: string;
  testcases: IFeatureTest[];
  testcasesNotRunned: IFeatureTest[];
  dependency: string[];
}

interface IReleaseData {
  release: string;
  data: IModuleData[];
}

interface ISelections {
  application: string;
  module: string;
  release: string;
  moduleName: string;
}

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: '',
    module: '',
    release: '',
    moduleName: '',
  });

  const [releaseData, setReleaseData] = useState<IReleaseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch release-specific data when a new release is selected
  useEffect(() => {
    if (selections.release) {
      setIsLoading(true);
      axios.get<IReleaseData[]>(`http://your-api-endpoint/releases/${selections.release}`)
        .then(response => {
          setReleaseData(response.data);
        })
        .catch(error => {
          console.error("Error fetching release data:", error);
          alert("Failed to fetch release data for the selected release");
        })
        .finally(() => setIsLoading(false));
    }
  }, [selections.release]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelections(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'release') {
      setReleaseData([]); // Clear previous release data when a new release is selected
    }
  };

  const renderModuleData = (module: IModuleData) => {
    // Calculate totals
    const totalTestCases = module.testcases.reduce((acc, curr) => acc + curr.tests.length, 0);
    const totalTestCasesNotRunned = module.testcasesNotRunned.reduce((acc, curr) => acc + curr.tests.length, 0);
    const testCasesExecuted = totalTestCases - totalTestCasesNotRunned;

    return (
      <>
        <tr>
          <td>{module.testcases.map(tc => `${tc.feature}: ${tc.tests.join(', ')}`).join('; ')}</td>
          <td>{module.testcasesNotRunned.map(tc => `${tc.feature}: ${tc.tests.join(', ')}`).join('; ')}</td>
          <td>{module.dependency.join(", ")}</td>
        </tr>
        <tr>
          <td>Total number of test cases: {totalTestCases}</td>
          <td>Number of test cases executed: {testCasesExecuted}</td>
          <td>Number of test cases missed: {totalTestCasesNotRunned}</td>
        </tr>
      </>
    );
  };

  return (
    <div className="comparison-container">
      {/* Selection dropdowns */}
      <div className="selections-area">
        {/* Dropdowns for Application, Module, Release, and Module Name */}
        {/* Implementation is similar to before, focused on TypeScript integration */}
      </div>

     <div className="dropdown">
        <label htmlFor="moduleName">Module Name</label>
        <select
          name="moduleName"
          value={selections.moduleName}
          onChange={handleSelectionChange}
          disabled={!releaseData || releaseData.length === 0}
        >
          <option value="">Select Module Name</option>
          {releaseData && releaseData.filter(r => r.release === selections.release).flatMap(r => r.data).map(module => (
            <option key={module.name} value={module.name}>{module.name}</option>
          ))}
        </select>
      </div>
    </div>

    {isLoading ? (
      <p>Loading...</p>
    ) : (
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
            {releaseData && releaseData.filter(r => r.release === selections.release).flatMap(r => r.data.map(module => (
              <React.Fragment key={module.name}>
                <tr>
                  <td>{module.testcases.map(tc => `${tc.feature}: ${tc.tests.join(', ')}`).join('; ')}</td>
                  <td>{module.testcasesNotRunned.map(tc => `${tc.feature}: ${tc.tests.join(', ')}`).join('; ')}</td>
                  <td>{module.dependency.join(", ")}</td>
                </tr>
                {/* Additional logic for calculating and displaying total test cases, executed, and missed */}
              </React.Fragment>
            )))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

export default ComparisonTool;
