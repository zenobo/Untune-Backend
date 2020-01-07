var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
const Tasks = require('../tasks')

const SCOPES = ['https://www.googleapis.com/auth/youtube'];

const Auth = {
  /**
  Begin the auth and playlist creation process
  @param red
  @param redisClient
  @param oAuthClient
  **/
  startAuthorize: (res, redisClient, oAuthClient) => {
    // Check if we have previously stored a token.
    redisClient.getClient().get('youtube_token', function (error, result) {
      if (error || result == null) {
        res.send(Auth.getAuthUrl(oAuthClient))
      }else{
        oAuthClient.credentials = JSON.parse(result);
        Tasks.createPlaylists(oAuthClient, redisClient);
        res.send('Updating')
      }
    });
  },
  /**
  Get a URL that the user needs to authorize
  @param oAuthClient
  **/
  getAuthUrl: function(oAuthClient){
    var authUrl = oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    return authUrl;
  },
  /**
  Process and store a token
  @param code - auth code provided by the user
  @param redisClient
  @param oAuthClient
  **/
  setToken: function(code, redisClient, oAuthClient){
    oAuthClient.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      //oauth2Client.credentials = token;
      Auth.storeToken(token, redisClient);
    });
  },
  /**
  Add an entry for a new playlist that was created
  @param token - a token to store
  @param redisClient
  **/
  storeToken: (token, redisClient) => {
    redisClient.getClient().set(
      'youtube_token', JSON.stringify(token)
    )
    console.log('Token has been set')
  }
};

module.exports = Auth;
