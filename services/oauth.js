const redis = require('redis');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

let client;

class OAuth{
  constructor(){
    // Authorize a client with the loaded credentials, then call the YouTube API.
    let credentials = JSON.parse(process.env.CLIENT_SECRET);
    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];
    let oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
    client = oauth2Client;
    return client;
  }
  /**
  Return client to be used for oauth
  **/
  getClient(){
    return client;
  }
}

module.exports = OAuth;
