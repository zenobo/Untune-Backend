const Youtube = require('./youtube')
const Constants = require('../data/constants')

var Controller = {
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
