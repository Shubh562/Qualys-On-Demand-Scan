

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
import './ComparisonTool.scss'; // Ensure this path matches your SCSS file's location

// Define an interface for the component state
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

  // Module options based on application selection
  const moduleOptions: Record<string, string[]> = {
    WIBSV: ['wibsv-web', 'wibsv-card-management', 'wibsv-core', 'wibsv-profile-and-settings'],
    WIBAC: ['wibac-accounts', 'wibac-securewf-core', 'wibac-securewf-core-delegates', 'wibac-securewf-core-components'],
  };

  // Common options for branches
  const commonOptions: string[] = ['develop', 'main', 'feature'];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: value,
      ...(name === 'application' && { module: '' }), // Reset module on application change
    }));
  };

  const fetchResults = () => {
    console.log('Comparing...', selections);
  };

  const allSelected = Object.values(selections).every(value => value !== '');

  return (
    <div className="comparison-tool">
      <div className="dropdown">
        <select name="application" value={selections.application} onChange={handleSelectChange}>
          <option value="">Select Application</option>
          <option value="WIBSV">WIBSV</option>
          <option value="WIBAC">WIBAC</option>
        </select>
      </div>

      {/* Repeat for other dropdowns */}
      {/* Similar structure for module, baseBranch, and branchToCompare with appropriate disabling and option mapping */}

      <button onClick={fetchResults} disabled={!allSelected}>Compare</button>
    </div>
  );
};

export default ComparisonTool;
