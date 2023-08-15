const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const base64 = require('base-64');
const FormData = require('form-data');
const xml2js = require('xml2js');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Create a logger with timestamp and console transport
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'Qualys API' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

app.use(bodyParser.json());

// POST endpoint to receive inputs and verify them
app.post('/scan', async (req, res) => {
  const { requestorEmail, managerEmail, department,scanner, scanProfile,systemOwner, systemSupport,ipAddresses } = req.body;

  // Check if requestor email is valid
  if (!isValidEmail(requestorEmail)) {
    console.log(`Invalid requestor email address: ${requestorEmail}`);
    return res.status(400).send({ error: 'Invalid requestor email address' });
  }
  // Check if manager email is valid
  if (!isValidEmail(managerEmail)) {
    console.log(`Invalid manager email address: ${managerEmail}`);
    return res.status(400).send({ error: 'Invalid manager email address' });
  }
  //check if department is valid
  if (!isValidDepartment(department)) {
    console.log(`Invalid department name: ${department}`);
    return res.status(400).send({ error: 'Invalid department name' });
  }
   // Check if system owner email is valid
   if (!isValidEmail(systemOwner)) {
    console.log(`Invalid system owner email address: ${systemOwner}`);
    return res.status(400).send({ error: 'Invalid system owner email address' });
  }
   // Check if system support email is valid
   if (!isValidEmail(systemSupport)) {
    console.log(`Invalid system support email address: ${systemSupport}`);
    return res.status(400).send({ error: 'Invalid system support email address' });
  }
  // Check if scanner is valid
  if (!isValidScanner(scanner)) {
    console.log(`Invalid scanner specified: ${scanner}`);
    return res.status(400).send({ error: 'Invalid scanner specified' });
  }
  // Check if scan profile is valid
  if (!isValidScanProfile(scanProfile)) {
    console.log(`Invalid scan profile specified: ${scanProfile}`);
    return res.status(400).send({ error: 'Invalid scan profile specified' });
  }
  // Check if IP addresses are valid
  const invalidIPs = getInvalidIPs(ipAddresses);
  if (invalidIPs.length > 0) {
    console.log(`Invalid IP addresses: ${invalidIPs.join(', ')}`);
    return res.status(400).send({ error: `Invalid IP addresses: ${invalidIPs.join(', ')}` });
  }
  // Join valid IP adress
  const validIP = (getValidIPs(ipAddresses)).join(', ');
  // All inputs are valid, make API call to Qualys
  try {
    const userId = 'Qualys user id';
    const password = 'qualys password';
    const auth = 'Basic ' + base64.encode(userId + ':' + password);
    
    const form = new FormData();
    form.append('action', 'launch');
    form.append('scan_title', 'test_mr_robot');
    form.append('option_title', scanner);
    form.append('priority', '2');
    form.append('iscanner_name', scanProfile);
    form.append('ip', validIP);
    form.append('ip_network_id', '1216558');
    
    const response = await 
    axios.post('https://qualysapi.qg2.apps.qualys.eu/api/2.0/fo/scan/', form, {
      headers: {
        'X-Requested-With': 'QualysPostman',
        'Authorization': auth,
        ...form.getHeaders()
      },
      maxBodyLength: Infinity
    });
    logger.info(`API response status: ${response.status}`);
    logger.info(`API response data: ${JSON.stringify(response.data)}`);
  
      xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
      const scanReference = result["SIMPLE_RETURN"]["RESPONSE"][0]["ITEM_LIST"][0]["ITEM"].find(item => item["KEY"][0] === 'REFERENCE')["VALUE"][0].split('/')[1];
      console.log(`API call made successfully, scan reference: ${scanReference}`);
      //sendEmail(requestorEmail, scanReference);
      monitorScanStatus(scanReference);
      return res.status(200).send({ message: 'Inputs verified and API call made successfully', scanReference });
    });
  } catch (error) {
    console.error(`Error making API call to Qualys: ${error}`);
    return res.status(500).send({ error: 'Error making API call to Qualys' });
  }
});
const INTERVAL_TIME = 180000; // Interval time for monitoring scan status in milliseconds
async function monitorScanStatus(scanReference) {
  try {
    const userId = 'qualys user id';
    const password = 'qualys password';
    const auth = 'Basic ' + base64.encode(userId + ':' + password);

    const form = new FormData();
    form.append('action', 'list');
    form.append('show_ags', '0');
    form.append('scan_ref','scan/'+scanReference);
    form.append('show_op', '1');
    form.append('show_status', '1');

    const response = await axios.post('https://qualysapi.qg2.apps.qualys.eu/api/2.0/fo/scan/', form, {
      headers: {
        'X-Requested-With': 'QualysPostman',
        'Authorization': auth,
        'Cookie': 'in_scope_scan_list=1',
        ...form.getHeaders()
      },
      maxBodyLength: Infinity
    });
    xml2js.parseString(response.data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
    const status = result["SCAN_LIST_OUTPUT"]["RESPONSE"][0]["SCAN_LIST"][0]["SCAN"][0]["STATUS"][0]["STATE"][0];
    console.log(status);
    logger.info(`Scan status: ${status}`);

    if (status !== 'Finished' && status !== 'Cancelled' && status !== 'Stopped') {
      setTimeout(async () => {
        await monitorScanStatus(scanReference);
      }, INTERVAL_TIME);
    } else if (status === 'Finished') {
      // Scan completed successfully
      logger.info('Scan completed successfully');
      // Do something else here after the scan is completed
      const apiEndpoint = 'https://qualysapi.qg2.apps.qualys.eu/api/2.0/fo/scan/';
      const outputFormat = 'csv';
      const formData = new FormData();
      formData.append('action', 'fetch');
      formData.append('scan_ref', 'scan/'+scanReference);
      formData.append('mode', 'extended');
      formData.append('output_format', outputFormat);
      // Set up the API call headers
      const headers = {
        'X-Requested-With': 'QualysPostman',
        'Authorization':auth ,
        'Cookie': 'in_scope_scan_list=1',
        ...formData.getHeaders()
      };

      // Send the API call to retrieve the scan results
      axios.post(apiEndpoint, formData, { headers })
        .then(response => {
          // Save the CSV file attachment to disk
          const fileName = 'scan_results.csv';
          fs.writeFileSync(fileName, response.data);
          //sendResults(requestorEmail,fileName);
        })
        .catch(error => {
          console.error('Error retrieving scan results:', error);
        });
    } else {
      // Scan stopped or cancelled
      logger.error(`Scan stopped/cancelled with status: ${status}`);
      // Do something else here if the scan is stopped or cancelled
    }
});
  } catch (error) {
    logger.error(`Error monitoring scan status: ${error}`);
  }
}
// Helper function to check if email is valid
function isValidEmail(email) {
  // Regex pattern for email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@(vodacom\.co\.za|vcontractor\.co\.za)$/i;
  return emailPattern.test(email);
}
function isValidDepartment(department) {
  // Regex pattern for email validation
  const departmentPattern = /^.{6,}$/;
  return departmentPattern.test(department);
}
// Helper function to check if scanner is valid
function isValidScanner(scanner) {
  const validScanners = ['VF-ZA_Profile_Vuln_Light_Auth_Scan (not incl. Dead Hosts)', 'VF_ZA_Profile_Vuln_Light_unauth_Scan(not incl. Dead Hosts)'];
  return validScanners.includes(scanner);
}
// Helper function to check if scan profile is valid
function isValidScanProfile(scanProfile) {
  const validScanProfiles = ['VF-ZA_01','VF-ZA_02 (IT)','VF-ZA_03 (IT)','VF-ZA_04 (IT)','VF-ZA_05 (IT)','VF-ZA_06 (EBU)','VF-ZA_07 (EBU)'];
  return validScanProfiles.includes(scanProfile);
}
// Helper function to get invalid IP addresses
function getInvalidIPs(ipAddresses) {
  const invalidIPs = [];
  ipAddresses.forEach(ip => {
    // Regex pattern for IP address validation
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (!ipPattern.test(ip)) {
      invalidIPs.push(ip);
    }
  });
  return invalidIPs;
}
function getValidIPs(ipAddresses) {
  const validIPs = [];
  ipAddresses.forEach(ip => {
    // Regex pattern for IP address validation
    const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipPattern.test(ip)) {
      validIPs.push(ip);
    }
  });
  return validIPs;
}
//Helper function to send email with scan results
function sendResults(requestorEmail, fileName) {
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'your email id',
  pass: 'passsword'
  }
  });
   // Send an email with the scan results attached
   const mailOptions = {
    from: 'shubh.king52@gmail.com',
    to: requestorEmail,
    subject: 'Vulnerability scan results',
    text: 'Please find attached the results of the vulnerability scan.',
    attachments: [{
      filename: fileName,
      content: fs.createReadStream(fileName)
    }]
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.error(error);
    } else {
    console.log('Email sent: ' + info.response);
    }
    });
}

// Helper function to send email with scan reference ID
function sendEmail(requestorEmail, scanReference) {
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
  user: 'your email id',
  pass: 'password'
  }
  });
  const mailOptions = {
  from: 'shubh.king52@gmail.com',
  to: requestorEmail,
  subject: 'Scan Reference ID',
  text: `Your scan reference ID is ${scanReference}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
  console.error(error);
  } else {
  console.log('Email sent: ' + info.response);
  }
  });
  }
// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
