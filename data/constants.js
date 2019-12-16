var Constants = {
  list: function(){
    return [
      {name: 'music'},
      {name: 'listentothis'},
      {name: 'hiphopheads'},
      {name: 'deephouse'},
      {name: 'videos'},
      {name: 'country'},
      {name: '80smusic'},
      {name: 'kpop'},
      {name: 'rap'},
      {name: 'funkhouse'},
      {name: 'house'}
    ];
  },
  maxSubreddits: function(){
    return 18;
  },
  cors: function(){
    return '*';
  },
  playlistDelay: function(index){
    return 10000*index;
  }
}

module.exports = Constants;
