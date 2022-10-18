const functions = require('firebase-functions');
const https = require('https');

const apiToken = functions.config().joco_functions.github_token;

const api = async (method, url, body = undefined) => {
  return new Promise((resolve, reject) => {

    const request = https.request({
      hostname: 'api.github.com',
      path: url,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${apiToken}`,
        'User-Agent': 'shaw-ps'
      },

    }, res => {
      let data = [];
      const status = res.statusCode;

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        const response = JSON.parse(Buffer.concat(data).toString());
        resolve({ status, data: response });
      });

    });

    if (body)
      request.write(JSON.stringify(body));

    request.end();

  });
}

module.exports = { api }