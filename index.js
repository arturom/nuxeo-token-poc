/**
 * This is a proof of concept server with an endpoint to request authentication tokens
 * on behalf of the Nuxeo user for the credentials provided.
 */

const Nuxeo = require("nuxeo");

const express = require("express");

const { NUXEO_HOST, NUXEO_USERNAME, NUXEO_PASSWORD, APP_SERVER_PORT } = process.env;

const baseURL = "http://127.0.0.1:8080/nuxeo" || NUXEO_HOST;

function getNuxeoClient() {
  // These should be the credentials of the user we want to create a session for
  const config = {
    baseURL,
    auth: {
      method: "basic",
      username: "Administrator" || NUXEO_USERNAME,
      password: "Administrator" || NUXEO_PASSWORD,
    },
  };

  return new Nuxeo(config);
}

async function getToken(nuxeo, username) {
  const token = await nuxeo.requestAuthenticationToken(
    "sgdau", // Application name
    username, // Username of current authenticated user
    "nodejs", // Application description
    "rw" // Permissions
  );
  return token;
}

const app = express();
const port = APP_SERVER_PORT || 3000;

app.get("/create-session", async (req, res) => {
  const nuxeo = getNuxeoClient();
  // We assume the server knows who the current authenticated user is.
  // The username is used to create a unique token for that user
  const currentUser = "ReinaldoAndradeCerqueira";
  const token = await getToken(nuxeo, currentUser);
  res.json({ token, url: baseURL });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
