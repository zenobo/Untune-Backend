const Reddit = require('../services/reddit');
const {google} = require('googleapis');
const { PLAYLIST_DELAY } = require('../data/constants');
const Youtube = require('../services/youtube');
const Controller = require('../services/controller');

const Tasks = {
  /**
  @task - Full procedure to generate playlists via youtube and reddit
  @param auth - oauth for youtube
  @param redisClient - client for redis connection
  **/
  createPlaylists: async (auth, redisClient) => {
    let playlist_id;
    let posts;

    // Create youtube service
    const service = google.youtube({
      version: 'v3',
      auth: auth,
    });

    // Get list of subreddits
    const subreddits = Reddit.getSubreddits();

    // Map subreddits
    subreddits.map((subreddit, index)=>{
      setTimeout(async ()=>{

        // Create playlist
        playlist_id = await Youtube.createPlaylist(service, subreddit.name);

        // Load reddit posts
        posts = await Reddit.loadPosts(subreddit.name);
        console.log(posts);

        // Save posts and playlist URL in memory
        Controller.setCache(posts, playlist_id, redisClient, subreddit.name);

        // Map reddit posts
        await Controller.insertPlaylistItems(service, playlist_id, posts);

      }, PLAYLIST_DELAY*index);
    })

  }
}

module.exports = Tasks;
