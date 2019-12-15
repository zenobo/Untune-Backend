const axios = require('axios')
const Constants = require('../data/constants')

const Reddit = {
  loadPosts: async (subreddit) => {
    var entries = [];
    const response = await axios.get(`https://www.reddit.com/r/${subreddit}/hot/.json?count=30`)
    return Reddit.validateIds(response);
  },
  getYoutubeId: function(link){
    try{
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = link.match(regExp);
      return (match&&match[7].length==11)? match[7] : false;
    }catch(err){
      console.log('Error getting youtube ID', err);
      return ''
    }
  },
  validateIds: function(data){
    var entries = [];
    data.data.data.children.map((val)=>{
      let {url, permalink, title} = val.data;
      // filter by youtube
      if(url && (url.includes('youtube') || url.includes('youtu.be'))){
        // add video
        if(Reddit.getYoutubeId(url).length==11) entries.push({url, permalink, title, youtubeId: Reddit.getYoutubeId(url)})
      }
    })
    return entries;
  },
  getSubreddits: function(){
    return Constants.list();
  }
};

module.exports = Reddit;
