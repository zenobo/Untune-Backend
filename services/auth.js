var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

const SCOPES = ['https://www.googleapis.com/auth/youtube'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'untune-credentials2.json';

const Auth = {
  startAuthorize: (res, callback, redisClient) => {
    res.send('Updating')
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
      if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
      }
      // Authorize a client with the loaded credentials, then call the YouTube API.
      Auth.authorize(JSON.parse(content), callback, redisClient);
    });
  },
  authorize: (credentials, callback, redisClient) => {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    redisClient.getClient().get('youtube_token', function (error, result) {
      if (error || result == null) {
        Auth.getNewToken(oauth2Client, callback, redisClient);
      }else{
        oauth2Client.credentials = JSON.parse(result);
        callback(oauth2Client);
      }
    });
  },
  getNewToken: (oauth2Client, callback, redisClient) => {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        Auth.storeToken(token, redisClient);
        callback(oauth2Client);
      });
    });
  },
  storeToken: (token, redisClient) => {
    redisClient.getClient().set(
      'youtube_token', JSON.stringify(token)
    )
  }
};

module.exports = Auth;
