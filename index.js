require('dotenv').config()

const {google} = require('googleapis');
const express = require('express')

const Routes = require('./routes/routes')

const Auth = require('./services/auth')
const Reddit = require('./services/reddit')
const Youtube = require('./services/youtube')
const Controller = require('./services/controller')
const Redis = require('./services/redis')

var redisClient = new Redis()

/**
@param auth - oauth2 client returned after generating youtube api credentials
**/
async function createPlaylists(auth) {
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

      // Map reddit posts
      await Controller.insertPlaylistItems(service, playlist_id, posts);

      // Save posts and playlist URL in memory
      Controller.setCache(posts, playlist_id, redisClient, subreddit.name)

    }, 10000*index)
  })

}

// Routes
const app = express()
const port = 3000

// Update playlists
app.get('/update', (req, res) => Auth.startAuthorize(res, createPlaylists))

// GET endpointts
app.get('/subreddit', (req, res) => Routes.reddit(res, req, redisClient))


app.listen(port, () => console.log(`Express on port ${port}!`))
