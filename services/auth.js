var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/youtube'];

const Auth = {
  startAuthorize: (res, callback, redisClient, oAuthClient) => {
    res.send('Updating')
    // Check if we have previously stored a token.
    redisClient.getClient().get('youtube_token', function (error, result) {
      if (error || result == null) {
        res.send(Auth.getAuthUrl(oAuthClient))
      }else{
        oAuthClient.credentials = JSON.parse(result);
        callback(oAuthClient);
      }
    });
  },
  getAuthUrl: function(oAuthClient){
    var authUrl = oAuthClient.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    return authUrl;
  },
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
  storeToken: (token, redisClient) => {
    redisClient.getClient().set(
      'youtube_token', JSON.stringify(token)
    )
    console.log('Token has been set')
  }
};

module.exports = Auth;
