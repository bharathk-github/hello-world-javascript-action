/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 300:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 254:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 561:
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ 849:
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ 286:
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ 503:
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ 411:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 742:
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ 492:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ 477:
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ 41:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 261:
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ 628:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 267:
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			179: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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
  const fs = __nccwpck_require__(147);
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
const https = __nccwpck_require__(687);

let authHeader
if (authToken !== "") {
  authHeader = `Basic ${Buffer.from(`PasswordIsAuthToken:${authToken}`).toString('base64')}`
} else if (password !== "") {
  authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
} else if (authToken == "" && password == "") {
  throw new Error("Authentication unsuccessful!, Please provide either UCD password or UCD auth token ");
}

__nccwpck_require__.e(/* import() */ 960).then(__nccwpck_require__.bind(__nccwpck_require__, 960))
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

  __nccwpck_require__.e(/* import() */ 960).then(__nccwpck_require__.bind(__nccwpck_require__, 960))
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



})();

module.exports = __webpack_exports__;
/******/ })()
;