# GitHub Action: Deploy UCD Application

This GitHub Action automates the process of triggering an UrbanCode Deploy (UCD) application process request based on the provided inputs. It streamlines the deployment workflow by integrating UCD directly into your GitHub repository.

## Inputs

1. `application` (required): The name of the application in UrbanCode Deploy.
2. `applicationProcess` (required): The name of the application process in UrbanCode Deploy.
3. `environment` (required): The name of the target environment in UrbanCode Deploy.
4. `onlyChanged` (optional): A boolean value indicating if only changed artifacts should be deployed. Default is `false`.
5. `properties` (optional): Properties for the application process as a JSON string. Default is an empty string.
6. `propertiesfile` (optional):   description : Properties file path in the local ore remote repository for Application process properties.
7. `snapshot` (optional): Snapshot name/Id. Snapshot is mutually exclusive of versions parameter. Snapshot takes precedence over versions when both have input values
8. `versions` (required): Versions along with components as a JSON string. Each version should have a "component" and "version" key.
9. `hostname` (required): The hostname of the UrbanCode Deploy instance.
10. `port` (optional): The port number of the UrbanCode Deploy instance. Default is `8443`.
11. `username` (required): Your UrbanCode Deploy username.
12. `password` (Either this or authtoken is required): Your UrbanCode Deploy password. This input is marked as a secret.
13. `authToken`(Either this or password is required): Your UrbanCode Deploy auth token. This input is marked as a secret.  **username** is not needed when authToken is provided, if provided it will be ignored.
14. `disableSSLVerification` (optional): A boolean value indicating whether to skip SSL certificate validation when making HTTPS requests. Default is `false`.

## Usage Examples 

### Example:-1 Deploy using versions

```yaml
name: Deploy to UCD

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Deploy to UCD
      uses: kblogin123456/hello-world-javascript-action@v1.23
      with:
        application: 'MyApp'
        applicationProcess: 'DeployProcess'
        environment: 'Production'
        onlyChanged: true
        properties: '{"key1": "value1", "key2": "value2"}'
        versions: '[{"component": "Component1", "version": "1.0"}, {"component": "Component2", "version": "2.0"}]'
        hostname: ${{ secrets.UCD_HOSTNAME }}
        username: ${{ secrets.UCD_USERNAME }}
        password: ${{ secrets.UCD_PASSWORD }}
        disableSSLVerification: true
```

### Example:-2 Deploy using snapshot

```yaml
name: Deploy to UCD

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Deploy to UCD
      uses: kblogin123456/hello-world-javascript-action@v1.23
      with:
        application: 'MyApp'
        applicationProcess: 'DeployProcess'
        environment: 'Production'
        onlyChanged: true
        properties: '{"key1": "value1", "key2": "value2"}'
        snapshot: 'snapshot-1'
        hostname: ${{ secrets.UCD_HOSTNAME }}
        username: ${{ secrets.UCD_USERNAME }}
        password: ${{ secrets.UCD_PASSWORD }}
        disableSSLVerification: true
```


### Example:-3 Deploy versions using authToken to authenticate

```yaml
name: Deploy to UCD

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Deploy to UCD
      uses: kblogin123456/hello-world-javascript-action@v1.23
      with:
        application: 'MyApp'
        applicationProcess: 'DeployProcess'
        environment: 'Production'
        onlyChanged: true
        properties: '{"key1": "value1", "key2": "value2"}'
        versions: '[{"component": "Component1", "version": "1.0"}, {"component": "Component2", "version": "2.0"}]'
        hostname: ${{ secrets.UCD_HOSTNAME }}
        authToken: ${{ secrets.UCD_AUTHTOKEN }}
        disableSSLVerification: true
```

### Example:-4 Deploy with Properties fetched from a file in local repository and using Github secrets

```yaml
on:
  workflow_dispatch:
jobs:
  hello_world_job:
    runs-on: self-hosted
    environment: DEV
    name: A job to deploy UCD application
    steps:
      - name: Fetch properties file
        id: download_ucd_properties_file  
        uses: actions/checkout@v4
        with:
          repository: bharathk-github/Testing
          sparse-checkout: |
            ucdproperties.prop
          sparse-checkout-cone-mode: false
      - name: Deploy UCD application
        id: Deploy_MYAPP
        uses: bharathk-github/UrbanCodeDeployAction@v1.29
        with:
          application: 'MYAPP'
          applicationProcess: 'DEPLOY-MYAPP'
          environment: 'DEV'
          propertiesfile: 'ucdproperties.prop'          
          versions: '[{"version": "BUILD-DEV-JCL", "component": "MYCOMP"}]'
          hostname: '${{ secrets.UCD_HOST }}'
          port: '8443'
          username: '${{ secrets.UCD_USERNAME }}'
          password: '${{ secrets.UCD_PASSWORD }}'
          authToken: '${{ secrets.UCD_AUTHTOKEN }}'
          disableSSLVerification: 'true'
```

### Example-5 Deploy with Proprties fetched from Github variables

```yaml

on:
  workflow_dispatch:
jobs:
  hello_world_job:
    runs-on: self-hosted
    environment: DEV
    name: A job to deploy UCD application
    steps:
      - name: Deploy UCD application
        id: Deploy_MYAPP
        uses: bharathk-github/UrbanCodeDeployAction@v1.29
        with:
          application: 'MYAPP'
          applicationProcess: 'DEPLOY-MYAPP'
          environment: 'DEV'
          properties: '{"prop1":"${{ vars.PROP1 }}", "prop2":"${{ vars.PROP2 }}"}'
          propertiesfile: 'ucdproperties'
          versions: '[{"version": "BUILD-DEV-JCL", "component": "MYCOMP"}]'
          hostname: '${{ secrets.UCD_HOST }}'
          port: '8443'
          username: '${{ secrets.UCD_USERNAME }}'
          password: '${{ secrets.UCD_PASSWORD }}'
          authToken: '${{ secrets.UCD_AUTHTOKEN }}'
          disableSSLVerification: 'true'
```
