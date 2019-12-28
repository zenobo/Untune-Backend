var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var Utility = require('./utility')

const Youtube = {
  createPlaylist: (service, subreddit) => {
    return new Promise(
        function (resolve, reject) {
          console.log(`creating r/${subreddit}`)
          service.playlists.insert({
            resource: {
              snippet: {
                title: `r/${subreddit} Playlist - ${Utility.getDate()}`,
                description: `r/${subreddit} playlist created by Untune.io`,
          			tags: [],
                defaultLanguage: "en_US"
              },
              status: {
                privacyStatus: "public"
              }
            },
            part: "snippet,status"
          }, function(err, response) {
            if(err) console.log(err)
            resolve(response.data.id);
          })

        }
    );
  },
  insertPlaylistItem: (service, playlist_id, video_id) => {
    return new Promise(
        function (resolve, reject) {
          service.playlistItems.insert({
            resource: {
              snippet: {
                playlistId: playlist_id,
                resourceId: {
                  kind: "youtube#video",
                  videoId: video_id
                }
              }
            },
            part: "snippet"
          }, function(err, response) {
            if(err) console.log(err)
            resolve(true);
          })

        }
    );
  }
};

module.exports = Youtube;
