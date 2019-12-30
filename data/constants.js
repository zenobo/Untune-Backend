var Constants = {
  list: function(){
    return [
      {name: 'music'},
      {name: 'listentothis'},
      {name: 'hiphopheads'},
      {name: 'deephouse'},
      {name: 'country'},
      {name: '80smusic'},
      {name: 'kpop'},
      {name: 'rap'},
      {name: 'funkhouse'},
    ];
  },
  maxSubreddits: function(){
    return 15;
  },
  cors: function(){
    return '*';
  },
  playlistDelay: function(index){
    return 10000*index;
  }
}

module.exports = Constants;
