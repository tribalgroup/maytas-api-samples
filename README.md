# Purpose
The Maytas OData API allows developers to interact with the Maytas data model to perform common actions.   The API supports the OData 4.0 standard.  The querying, creation and updating of data are all supported.

This repository provides information on using the API, along with some samples that you can download and execute to demonstrate the functionality.  

# Using the samples

## Requirements

- Node (> 18.4.0 )
- The url to your instance of the Tribal Maytas OData API.
- Your Edge Identity Server url.
- Client details (id/secret) for a client created with the ```Maytas.OData.Read``` and ```Maytas.OData.Write``` scopes.   Please see the relevant section with details of how to configure a client.

## Running 

1. In a terminal session, from within the ```src``` folder, install the npm modules:

```powershell
npm install
```

2. In the ```src/env``` folder, copy the ```template.env``` file to create a ```dev.env``` file.    You then need to update this file with your own environment details.  

|Item                     |Value                        |
|-------------------------|-----------------------------|
|idsUrl                   | Url of Edge Identity Server e.g. ``` https://k8dev.edge.tribaldev.net/dev-sr/ids/caltech ```|
|maytasSampleBaseUrl      | Url for Maytas OData API |
|maytasSampleClientId     | Client ID created via the Edge Admin application.   Will start with ```api_```
|maytasSampleClientSecret | Client Secret created via the Edge Admin application.   

3. To run a sample, in your terminal window, type:
```
node ./create-trainee-basic.js
```
