

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
import './ComparisonTool.scss'; // Adjust the path as needed to match your project structure

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

  const moduleOptions: Record<string, string[]> = {
    WIBSV: ['wibsv-web', 'wibsv-card-management', 'wibsv-core', 'wibsv-profile-and-settings'],
    WIBAC: ['wibac-accounts', 'wibac-securewf-core', 'wibac-securewf-core-delegates', 'wibac-securewf-core-components'],
  };

  const commonOptions: string[] = ['develop', 'main', 'feature'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelections(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'application' && { module: '' }), // Reset module when application changes
    }));
  };

  const fetchResults = async () => {
    console.log('Comparing...', selections);
  };

  const allSelected = Object.values(selections).every(value => value !== '');

  return (
    <div className="comparison-tool">
      {['application', 'module', 'baseBranch', 'branchToCompare'].map((field, index) => (
        <div key={index} className="dropdown">
          <label>{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}</label>
          <select
            name={field}
            value={selections[field as keyof ISelections]}
            onChange={handleSelectChange}
            disabled={index !== 0 && !selections['application'] || index === 2 && !selections['module'] || index === 3 && !selections['baseBranch']}
          >
            <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
            {(field === 'module' && selections.application && moduleOptions[selections.application] ||
             field !== 'module' && commonOptions).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      ))}

      <button className="compare-button" onClick={fetchResults} disabled={!allSelected}>
        Compare
      </button>
    </div>
  );
};

export default ComparisonTool;







// ComparisonTool.scss
.comparison-tool {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 400px; // Adjust based on your preference

  .dropdown {
    display: flex;
    flex-direction: column;
    gap: 5px;

    label {
      font-weight: bold;
    }

    select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      &:disabled {
        background-color: #f0f0f0;
      }
    }
  }

  .compare-button {
    padding: 10px 20px;
    border-radius: 4px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    width: auto; // Allows the button to size based on content rather than stretching
    &:disabled {
      background-color: #ccc;
      color: #666;
      cursor: not-allowed;
    }
  }
}
