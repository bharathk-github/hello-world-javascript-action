const application = process.env.INPUT_APPLICATION;
const applicationProcess = process.env.INPUT_APPLICATIONPROCESS;
const environment = process.env.INPUT_ENVIRONMENT;
const snapshot = process.env.INPUT_SNAPSHOT;
const inputVersions = process.env.INPUT_VERSIONS;

var versions;
var useVersion;
if (snapshot == null || snapshot == "") {
  try {
    if (inputVersions == null || inputVersions == "") {
      console.error('No snapshot (or) Version provided in the input to be deployed ');
      throw new Error("Missing version (or) snapshot in the input");
    }
    versions = JSON.parse(inputVersions);
    useVersion = true;
  } catch (error) {
    console.error('Error parsing input versions json ', error)
    console.error("----------------------------------------")
    console.error(process.env.INPUT_VERSIONS)
    console.error("----------------------------------------")
    throw new Error("Acceptable JSON format for versions is {\"version\":\"version1\" , \n  \"component\":\"component1\"}");
  }
}

const inputPropertiesFile = process.env.INPUT_PROPERTIESFILE;
const inputProperties = process.env.INPUT_PROPERTIES;
var properties = null;
if (inputPropertiesFile == null || inputPropertiesFile == "") {
  if (inputProperties == null || inputProperties == "") {
    console.log('No properties detected in this deployment request');
  } else {
    try {
      properties = JSON.parse(inputProperties);
    } catch (error) {
      console.error('Error parsing input properties json ', error)
      console.error("----------------------------------------")
      console.error(inputProperties)
      console.error("----------------------------------------")
      throw new Error("Acceptable JSON format for properties is {\"prop1\":\"value1\" , \n  \"prop2\":\"value2\" }");
    }
  }
} else {
  const fs = require('fs');
  // Read the properties file
  const propertiesFilePath = process.env.GITHUB_WORKSPACE + inputPropertiesFile;

  console.log("Properties fie path recieved from user " + inputPropertiesFile + "\n and we resolved it to " + propertiesFilePath);
  const filePath = 'path/to/your/file.txt'; // Replace with the path to your file

  // Check if the file exists
  fs.access(propertiesFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        throw new Error('File does not exist!');
      } else {
        throw err; // Throw other errors
      }
    }
    // console.log('File exists');
  });

  const propertiesFileContent = fs.readFileSync(propertiesFilePath, 'utf-8');
  const props = {};
  const lines = propertiesFileContent.split('\n');
  for (const line of lines) {
    const [key, value] = line.split('=');
    if (key && value) {
      props[key.trim()] = value.trim();
    }
  }
  // Convert the properties object to a JSON string
  properties = JSON.stringify(props, null, 2);

}

const hostname = process.env.INPUT_HOSTNAME;
const username = process.env.INPUT_USERNAME;
const password = process.env.INPUT_PASSWORD;
const authToken = process.env.INPUT_AUTHTOKEN;
const onlyChanged = process.env.INPUT_ONLYCHANGED === 'true';
const disableSSLVerification = process.env.INPUT_DISABLESSLVERIFICATION === 'true';
const port = process.env.INPUT_PORT;
let requestId = '';
let intervalId;
const https = require('https');

let authHeader
if (authToken !== "") {
  authHeader = `Basic ${Buffer.from(`PasswordIsAuthToken:${authToken}`).toString('base64')}`
} else if (password !== "") {
  authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
} else if (authToken == "" && password == "") {
  throw new Error("Authentication unsuccessful!, Please provide either UCD password or UCD auth token ");
}

import('node-fetch')
  .then((module) => {
    const fetch = module.default;
    const apiUrl = 'https://' + hostname + ':' + port + '/cli/applicationProcessRequest/request';

    var data = {
      "application": application,
      "applicationProcess": applicationProcess,
      "environment": environment,
      "onlyChanged": onlyChanged,
      "properties": properties,
      [useVersion ? "versions" : "snapshot"]: useVersion ? versions : snapshot
    };
    
    console.log("request data before properties  "+ data )
    if (properties !== null) {
      data.properties = properties;
    }


    console.log("Triggering UCD deployment with " + data);

    const httpsAgent = new https.Agent({
      rejectUnauthorized: disableSSLVerification === 'true'
    });

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader // Include the basic authentication header
      },
      body: JSON.stringify(data),
      agent: httpsAgent
    })
      .then(response => response.json())
      .then(result => {
        console.log('API response:', result);
        requestId = result.requestId;
        console.log('Request-ID:', requestId);
        intervalId = setInterval(triggerAPI, 5000);
      })
      .catch(error => {
        console.error('Unable to deploy in UCD : ', error);
        throw new Error("Terminating!! ");
      });
  })
  .catch((error) => {
    console.error('Error:', error);
  });


function triggerAPI() {

  import('node-fetch')
    .then((module) => {
      console.log(" Will poll till completion of the UCD process with Request ID :- " + requestId);
      const fetch = module.default;
      const apiUrl = 'https://' + hostname + ':' + port + '/cli/applicationProcessRequest/requestStatus?request=' + requestId
      const httpsAgent = new https.Agent({
        rejectUnauthorized: disableSSLVerification === 'true'
      });

      if (disableSSLVerification === 'true') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      }

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': authHeader
        },
        agent: httpsAgent
      })
        .then(response => response.json())
        .then(result => {
          console.log('API response:', result);

          if (result.result === 'SUCCEEDED') {
            console.log('Status is SUCCEEDED. Breaking the loop.');
            clearInterval(intervalId);
          } else if (['APPROVAL REJECTED', 'CANCELED', 'FAILED TO START', 'FAULTED'].includes(result.result)) {
            console.error('Deployment failed: status = ' + result.result);
            clearInterval(intervalId);
            throw new Error('Deployment failed in UCD')
          }

        })
        .catch(error => {
          console.error('Error when getting the deployment status of the request:', error);
          throw new Error("Error when deploying application process request id" + requestId);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
      process.exit(1);
    });
}


