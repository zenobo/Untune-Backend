const Youtube = require('./youtube')
const Constants = require('../data/constants')

var Controller = {
  /**
  Map a list of posts and insert them into a youtube playlist
  @param service - youtube service API
  @param playlist_id - youtube playlist id
  @param posts - a list of youtube videos to add
  **/
  insertPlaylistItems: function(service, playlist_id, posts){
    return new Promise(
        async function (resolve, reject) {
          posts.map((post, i)=>{
            setTimeout(async ()=>{
              // Insert posts into playlist as videos
              if(i>Constants.maxSubreddits()) return;
              await Youtube.insertPlaylistItem(service, playlist_id, post.youtubeId);
            }, 1000*i);
          });
          resolve('done')
        }
    );
  },
  /**
  Add an entry for a new playlist that was created
  @param posts - a list of youtube videos
  @param redisClient - an instance of the redis client
  @param subreddit - the subreddit corresponding to the playlist
  **/
  setCache: function(posts, playlist_id, redisClient, subreddit){
    redisClient.getClient().set(
      subreddit, JSON.stringify({
        url: `https://www.youtube.com/watch?v=${posts[0].youtubeId}&list=${playlist_id}`,
        posts: posts
      })
    )
  }
}

module.exports = Controller;
