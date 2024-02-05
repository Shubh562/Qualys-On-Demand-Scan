

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

// Define TypeScript interfaces for the state
interface ISelections {
  application: string;
  module: string;
  baseBranch: string;
  branchToCompare: string;
}

interface IApiResponseItem {
  // Define your API response structure here
  // Example:
  id: number;
  detail: string;
  result: string;
}

const ComparisonTool: React.FC = () => {
  // State for storing dropdown selections
  const [selections, setSelections] = useState<ISelections>({
    application: '',
    module: '',
    baseBranch: '',
    branchToCompare: '',
  });

  // State for storing API response data
  const [results, setResults] = useState<IApiResponseItem[]>([]);

  // Handler for dropdown change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: value,
    }));
  };

  // Fetch results from API
  const fetchResults = async () => {
    try {
      const response = await fetch('/api/compare', {
        method: 'POST', // Adjust according to your API requirements
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selections),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: IApiResponseItem[] = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  // Render component
  return (
    <div>
      <select name="application" value={selections.application} onChange={handleSelectChange}>
        <option value="">Select Application</option>
        {/* Populate with actual options */}
      </select>

      <select name="module" value={selections.module} onChange={handleSelectChange}>
        <option value="">Select Module</option>
        {/* Populate with actual options */}
      </select>

      <select name="baseBranch" value={selections.baseBranch} onChange={handleSelectChange}>
        <option value="">Select Base Branch</option>
        {/* Populate with actual options */}
      </select>

      <select name="branchToCompare" value={selections.branchToCompare} onChange={handleSelectChange}>
        <option value="">Select Branch to Compare</option>
        {/* Populate with actual options */}
      </select>

      <button onClick={fetchResults}>Compare</button>

      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              {/* Dynamically generate table headers based on the first result keys */}
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                {Object.values(result).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonTool;

