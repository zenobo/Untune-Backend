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
