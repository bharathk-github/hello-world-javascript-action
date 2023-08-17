const application = process.env.INPUT_APPLICATION;
const applicationProcess = process.env.INPUT_APPLICATIONPROCESS;
const environment = process.env.INPUT_ENVIRONMENT;

var versions;
try {
  versions = JSON.parse(process.env.INPUT_VERSIONS);
} catch (error) {
  console.error('Error parsing input versions json ', error)
  console.error("----------------------------------------")
  console.error(process.env.INPUT_VERSIONS)
  console.error("----------------------------------------")
  throw new Error("Acceptable JSON format for versions is {\"version\":\"version1\" , \n  \"component\":\"component1\"}");
}

const inputProperties = process.env.INPUT_PROPERTIES;
var properties = null;
if (inputProperties !== null && inputProperties !== "") {
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


const hostname = process.env.INPUT_HOSTNAME;
const username = process.env.INPUT_USERNAME;
const password = process.env.INPUT_PASSWORD;
const onlyChanged = process.env.INPUT_ONLYCHANGED === 'true';
const disableSSLVerification = process.env.INPUT_DISABLESSLVERIFICATION === 'true';
const port = process.env.INPUT_PORT;
let requestId = '';
let intervalId;
const https = require('https');

import('node-fetch')
  .then((module) => {
    const fetch = module.default;
    const apiUrl = 'https://' + hostname + ':' + port + '/cli/applicationProcessRequest/request';

    const data = {
      "application": application,
      "applicationProcess": applicationProcess,
      "environment": environment,
      "onlyChanged": onlyChanged,
      "properties": properties,
      "versions": versions
    };

    if (properties !== null) {
      data.properties = properties;
    }

    console.log("Triggering UCD deployment with " + data);


    const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');


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
      const authHeader = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
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
          'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
        },
        agent: httpsAgent
      })
        .then(response => response.json())
        .then(result => {
          console.log('API response:', result);

          if (result.result === 'SUCCEEDED') {
            console.log('Status is SUCCEEDED. Breaking the loop.');
            clearInterval(intervalId);
          } else if (result.result === 'FAULTED' || result.result_v2 === 'FAULTED') {
            console.error('Status is FAULTED or FAULTING. Breaking the loop and exiting with an error.');
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


