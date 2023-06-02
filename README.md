# nuxeo-token-poc

This is a proof of concept to demonstrate the code needed on the server and on the browser to create a session using a token.
The code is annotated to explain the concepts of the POC.

- Back-end code: [index.js](index.js)
- Front-end code: [public/index.html](public/index.html)



### Setup
The server runs in NodeJS v18+. Install dependencies with npm
```shell
npm install
```


### Running the server
The server is configured with environment variables
```shell
NUXEO_HOST="http://127.0.0.1:8080/nuxeo" NUXEO_USERNAME="username" NUXEO_PASSWORD="password" node index.js
```
