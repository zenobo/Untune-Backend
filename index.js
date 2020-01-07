require('dotenv').config()
// Modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Components
const Routes = require('./routes/routes')
const Constants = require('./data/constants')
const Auth = require('./services/auth')
const OAuth = require('./services/oauth')
const Redis = require('./services/redis')

// Clients
var redisClient = new Redis()
var oAuthClient = new OAuth()

// Routes
const app = express()
const port = process.env.PORT || 3000

// Express
app.use(bodyParser.json())
app.use(cors());
app.options(Constants.cors(), cors());

// Routes

// Update playlists
app.get('/update', (req, res) => Auth.startAuthorize(res, redisClient, oAuthClient))
// GET endpoints
app.get('/subreddit', (req, res) => Routes.reddit(res, req, redisClient))
app.get('/getAuthUrl', (req, res) => Routes.getAuthUrl(res, req, oAuthClient))
// POST endpoints
app.post('/setToken', (req, res) => Routes.setToken(res, req, redisClient, oAuthClient))

// Server
app.listen(port, () => console.log(`Express on port ${port}!`))
