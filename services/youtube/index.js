const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const Utility = require('../utility');

const Youtube = {
  /**
  Create a playlist on the linked youtube account
  @param service - youtube service API
  @param subReddit - subreddit to use in youtube title and description
  **/
  createPlaylist: (service, subreddit) => {
    return new Promise(
        (resolve, reject) => {
          console.log(`creating r/${subreddit}`)
          service.playlists.insert({
            resource: {
              snippet: {
                title: `r/${subreddit} Playlist - ${Utility.getDate()}`,
                description: `r/${subreddit} playlist created by Untune.io`,
          			tags: [],
                defaultLanguage: "en_US",
              },
              status: {
                privacyStatus: "public",
              }
            },
            part: "snippet,status"
          }, (err, response) => {
            if (err) {
              console.log(err);
            }
            resolve(response.data.id);
          })

        }
    );
  },
  /**
  Add a video to a playlist
  @param service - youtube service API
  @param playlist_id - youtube playlist id
  @param video_id - youtube video id
  **/
  insertPlaylistItem: (service, playlist_id, video_id) => {
    return new Promise(
        (resolve, reject) => {
          service.playlistItems.insert({
            resource: {
              snippet: {
                playlistId: playlist_id,
                resourceId: {
                  kind: "youtube#video",
                  videoId: video_id,
                }
              }
            },
            part: "snippet"
          }, (err, response) => {
            if (err) {
              console.log(err)
            }
            resolve(true);
          })

        }
    );
  }
};

module.exports = Youtube;
