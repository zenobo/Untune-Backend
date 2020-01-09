## Untune API
The API is responsible for creating new playlists daily through the Youtube API.

## Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Tests](#tests)
- [Youtube API](#youtube-api)

## Overview
The components of Untune are the [Untune.io](https://github.com/zenobo/Untune.io) and the [Untune Chrome Extension](https://github.com/zenobo/Untune-Extension).

## Getting Started
Start a redis server

```
redis-server --port 6385
```

Use Node v12 to install and run the app
```
npm install
npm run start
```

#### Eslint
Untune uses the airbnb base linter, which runs on npm run start.

## Tests
Untune uses Jest to test js functions. Tests can be found inside the services folder, eg body.test.js. Mock data and expected state is imported from __mocks__. Whenever the app's state is changed, it will also need to seperately be updated here.

#### Run the test watcher  
```
npm run test
```

## Youtube API
Adding videos to a playlist requires authentication to a youtube account. There is currently a 10,000 credit quota, so the app is limited to posting 10 playlists. 

#### Setup
Visit the [Google Cloud Console](https://console.developers.google.com/apis/api/youtube.googleapis.com/overview) to create a project for the youtube data api. Create an OAuth 2.0 client and export the json key to a CLIENT_SECRET enviroment variable (.env file). 

#### Auth with Youtube account
Start the app and load the /update GET endpoint. You will be promoted to authorize an account through a google url. Follow the oauth screen and submit the auth code to the /setToken POST endpoint. Loading /update again will start the playlist create task.
