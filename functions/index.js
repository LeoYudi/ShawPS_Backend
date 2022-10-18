const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');

const { listUsers, userDetails, userRepos } = require("./controllers/github");

const app = express();

app.use(express.json());
app.use(cors());

exports.shaw_functions = functions.region('southamerica-east1').https.onRequest((request, response) => {

  app.get('/api/users/:username/details', userDetails);
  app.get('/api/users/:username/repos', userRepos);
  app.get('/api/users', listUsers);

  return app(request, response);
});
