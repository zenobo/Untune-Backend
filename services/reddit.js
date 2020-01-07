const axios = require('axios')
const { SUBREDDITS } = require('../data/constants')
const getYouTubeID = require('get-youtube-id');

const Reddit = {
  /**
  Load posts from reddits API
  @param subreddit - ID of the subreddit to load posts from
  **/
  loadPosts: async (subreddit) => {
    let entries = [];
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot/.json?count=30`)
    return Reddit.parseIds(response);
  },
  /**
  Convert Reddit posts to a list of youtube ID's
  @param data - a list of reddit posts
  **/
  parseIds: (data) => {
    let posts = [];
    let youtubeId;

    data.data.data.children.map((val)=>{
      let {url, permalink, title} = val.data;
      // add video
      youtubeId = getYouTubeID(url);
      if(youtubeId && youtubeId.length == 11){
        posts.push({url, permalink, title, youtubeId: youtubeId});
      }
    })
    return posts;
  },
  getSubreddits: () => {
    return SUBREDDITS;
  }
};

module.exports = Reddit;
