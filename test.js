

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
import { Select, Button } from 'antd';
import 'antd/dist/antd.css'; // Import Ant Design stylesheet

interface ISelections {
  application: string;
  module: string;
  baseBranch: string;
  branchToCompare: string;
}

const { Option } = Select; // Destructure Option from Select for convenience

const ComparisonTool: React.FC = () => {
  const [selections, setSelections] = useState<ISelections>({
    application: '',
    module: '',
    baseBranch: '',
    branchToCompare: '',
  });

  const moduleOptions = {
    WIBSV: ['wibsv-web', 'wibsv-card-management', 'wibsv-core', 'wibsv-profile-and-settings'],
    WIBAC: ['wibac-accounts', 'wibac-securewf-core', 'wibac-securewf-core-delegates', 'wibac-securewf-core-components'],
  };

  const commonOptions = ['develop', 'main', 'feature'];

  const handleSelectChange = (value: string, option: any) => {
    const name = option.name;
    setSelections(prevSelections => ({
      ...prevSelections,
      [name]: value,
      ...(name === 'application' && { module: '' }), // Reset module when application changes
    }));
  };

  const fetchResults = async () => {
    // Implement fetching logic here
    console.log('Comparing...', selections);
  };

  const allSelected = Object.values(selections).every(value => value !== '');

  return (
    <div className="comparison-tool">
      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select Application"
        value={selections.application}
        onChange={(value, option) => handleSelectChange(value, option)}
        name="application"
      >
        <Option value="WIBSV">WIBSV</Option>
        <Option value="WIBAC">WIBAC</Option>
      </Select>

      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select Module"
        value={selections.module}
        onChange={(value, option) => handleSelectChange(value, option)}
        name="module"
        disabled={!selections.application}
      >
        {selections.application && moduleOptions[selections.application].map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>

      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select Base Branch"
        value={selections.baseBranch}
        onChange={(value, option) => handleSelectChange(value, option)}
        name="baseBranch"
        disabled={!selections.module}
      >
        {commonOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>

      <Select
        style={{ width: 200, marginBottom: 16 }}
        placeholder="Select Branch to Compare"
        value={selections.branchToCompare}
        onChange={(value, option) => handleSelectChange(value, option)}
        name="branchToCompare"
        disabled={!selections.baseBranch}
      >
        {commonOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>

      <Button type="primary" onClick={fetchResults} disabled={!allSelected}>
        Compare
      </Button>
    </div>
  );
};

export default ComparisonTool;
