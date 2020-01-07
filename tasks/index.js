const Reddit = require('../services/reddit')
const {google} = require('googleapis');
const Constants = require('../data/constants')
const Youtube = require('../services/youtube')
const Controller = require('../services/controller')

const Tasks = {
  /**
  @task - Full procedure to generate playlists via youtube and reddit
  @param auth - oauth for youtube
  @param redisClient - client for redis connection
  **/
  createPlaylists: async function(auth, redisClient) {
    var playlist_id;
    var posts;

    // Create youtube service
    var service = google.youtube({
      version: 'v3',
      auth: auth
    });

    // Get list of subreddits
    var subreddits = Reddit.getSubreddits();

    // Map subreddits
    subreddits.map((subreddit, index)=>{
      setTimeout(async ()=>{

        // Create playlist
        playlist_id = await Youtube.createPlaylist(service, subreddit.name);

        // Load reddit posts
        posts = await Reddit.loadPosts(subreddit.name);
        console.log(posts)

        // Save posts and playlist URL in memory
        Controller.setCache(posts, playlist_id, redisClient, subreddit.name)

        // Map reddit posts
        await Controller.insertPlaylistItems(service, playlist_id, posts);

      }, Constants.playlistDelay(index))
    })

  }
}

module.exports = Tasks;
