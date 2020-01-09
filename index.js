require('dotenv').config();
// Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { CORS } = require('./data/constants');

// Components
const Routes = require('./routes/routes');
const Auth = require('./services/auth');
const OAuth = require('./services/oauth');
const Redis = require('./services/redis');

// Clients
const redisClient = new Redis();
const oAuthClient = new OAuth();

// Routes
const app = express();
const port = process.env.PORT || 3000;

// Express
app.use(bodyParser.json());
app.use(cors());
app.options(CORS, cors());

// Routes
app.get('/update', (req, res) => Auth.startAuthorize(res, redisClient, oAuthClient));
app.get('/subreddit', (req, res) => Routes.reddit(res, req, redisClient));
app.get('/getAuthUrl', (req, res) => Routes.getAuthUrl(res, req, oAuthClient));
app.post('/setToken', (req, res) => Routes.setToken(res, req, redisClient, oAuthClient));

// Server
app.listen(port, () => console.log(`Express on port ${port}!`));
